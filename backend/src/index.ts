import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import multer from "multer";
import path from "path";
import fs from "fs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authenticateToken, authorizeRoles, AuthRequest } from "./middleware/auth";

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Setup Multer for uploads
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });
app.use("/uploads", express.static(uploadDir));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// --- Auth Routes ---
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role, kycStatus: role === "RECEIVER" ? "PENDING" : "VERIFIED" },
    });
    
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || "default_secret", { expiresIn: "1d" });
    
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ error: "Registration failed" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || "default_secret", { expiresIn: "1d" });
    
    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

// --- Donations Routes ---
app.post("/api/donations", authenticateToken, authorizeRoles("DONOR"), upload.array("photos"), async (req, res) => {
  try {
    const donorId = (req as AuthRequest).user!.id;
    const { category, title, description, quantity } = req.body;
    const images = req.files ? (req.files as Express.Multer.File[]).map(f => `/uploads/${f.filename}`) : [];
    
    // Simulated Content Moderation (AI check representation)
    const objectionableWords = ["badword1", "hate", "violence"];
    const isObjectionable = objectionableWords.some(w => description.toLowerCase().includes(w));
    
    if (isObjectionable) {
      return res.status(400).json({ error: "Content flagged for objectionable material." });
    }

    const donation = await prisma.donation.create({
      data: {
        donorId, category, title, description, quantity, images: JSON.stringify(images),
        status: "PENDING_REVIEW" // Admin needs to approve
      }
    });
    res.json(donation);
  } catch (error) {
    res.status(500).json({ error: "Failed to submit donation" });
  }
});

app.get("/api/donations", async (req, res) => {
  try {
    const donations = await prisma.donation.findMany({ where: { status: "APPROVED" }, include: { donor: true } });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch donations" });
  }
});

// --- Needs Routes ---
app.post("/api/needs", authenticateToken, authorizeRoles("RECEIVER"), async (req, res) => {
  try {
    const receiverId = (req as AuthRequest).user!.id;
    const { category, title, goal, description, city, state, urgency } = req.body;
    
    // Simulated Abusive Language Check
    const abusiveWords = ["abuse", "scam"];
    if (abusiveWords.some(w => description.toLowerCase().includes(w))) {
      return res.status(400).json({ error: "Description contains abusive language." });
    }

    const need = await prisma.need.create({
      data: {
        receiverId, category, title, goal, description, city, state, urgency,
        status: "PENDING_REVIEW"
      }
    });
    res.json(need);
  } catch (error) {
    res.status(500).json({ error: "Failed to submit need" });
  }
});

app.get("/api/needs", async (req, res) => {
  try {
    const needs = await prisma.need.findMany({ where: { status: "APPROVED" }, include: { receiver: true } });
    res.json(needs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch needs" });
  }
});

// --- Admin Routes ---
app.get("/api/admin/pending-kyc", authenticateToken, authorizeRoles("ADMIN"), async (req, res) => {
  try {
    const users = await prisma.user.findMany({ where: { kycStatus: "PENDING" } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Fetch failed" });
  }
});

app.post("/api/admin/kyc/:id/approve", authenticateToken, authorizeRoles("ADMIN"), async (req, res) => {
  try {
    const user = await prisma.user.update({ where: { id: req.params.id }, data: { kycStatus: "VERIFIED" } });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Update failed" });
  }
});

app.post("/api/admin/posts/:type/:id/approve", authenticateToken, authorizeRoles("ADMIN"), async (req, res) => {
  try {
    const { type, id } = req.params;
    if (type === "donation") {
      await prisma.donation.update({ where: { id }, data: { status: "APPROVED" } });
    } else {
      await prisma.need.update({ where: { id }, data: { status: "APPROVED" } });
    }
    
    // Trigger Match Engine Simulation
    res.json({ success: true, message: "Post approved. Match engine triggered." });
  } catch (error) {
    res.status(500).json({ error: "Approval failed" });
  }
});

app.get("/api/admin/matches", authenticateToken, authorizeRoles("ADMIN"), async (req, res) => {
  // Simple algorithm: Match APPROVED needs and donations with same category
  try {
    const needs = await prisma.need.findMany({ where: { status: "APPROVED" }, include: { receiver: true } });
    const donations = await prisma.donation.findMany({ where: { status: "APPROVED" }, include: { donor: true } });
    
    const suggestedMatches = [];
    for (const n of needs) {
      for (const d of donations) {
        if (n.category === d.category) {
          suggestedMatches.push({
            need: n,
            donation: d,
            matchScore: 85 // Mock score
          });
        }
      }
    }
    res.json(suggestedMatches);
  } catch (error) {
    res.status(500).json({ error: "Match generation failed" });
  }
});

app.post("/api/admin/matches/approve", authenticateToken, authorizeRoles("ADMIN"), async (req, res) => {
  try {
    const { needId, donationId, matchScore } = req.body;
    const match = await prisma.match.create({
      data: { needId, donationId, matchScore, status: "APPROVED" }
    });
    // Update statuses
    await prisma.need.update({ where: { id: needId }, data: { status: "MATCHED" } });
    await prisma.donation.update({ where: { id: donationId }, data: { status: "MATCHED" } });
    
    res.json(match);
  } catch (error) {
    res.status(500).json({ error: "Match approval failed" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
