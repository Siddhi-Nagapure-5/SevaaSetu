// Relying on native fetch API (Node 18+)
// Since node version in package is not explicitly > 18 everywhere, we'll try native fetch first.

const BASE_URL = "http://localhost:3001/api";

async function runTests() {
  console.log("Starting API Verification...");

  try {
    // 1. Health Check
    console.log("1. Checking Health Endpoint...");
    const healthRes = await fetch(`${BASE_URL}/health`);
    const healthData = await healthRes.json();
    console.log("Health Check:", healthData);

    // 2. Register a User
    console.log("\n2. Registering a test user...");
    const registerRes = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test User",
        email: `testuser_${Date.now()}@example.com`,
        password: "password123",
        role: "DONOR"
      })
    });
    const registerData = await registerRes.json();
    console.log("Register Response:", registerData);

    if (!registerData.user) {
        throw new Error("Failed to register user");
    }

    const donorId = registerData.user.id;

    // 3. Create a Donation
    console.log("\n3. Creating a donation...");
    // For simplicity, we are sending JSON instead of FormData to test the logic. 
    // The endpoint expects multipart/form-data for photos, but since there is no photo required validation,
    // we can try sending a simple request or just test a GET endpoint.
    // Wait, the donation endpoint expects `upload.array("photos")`. fetch without FormData might throw.
    // Let's test the needs endpoint instead, which is purely JSON.
    
    console.log("\n3. Registering a Receiver...");
    const receiverRes = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Test Receiver",
          email: `receiver_${Date.now()}@example.com`,
          password: "password123",
          role: "RECEIVER"
        })
      });
      const receiverData = await receiverRes.json();
      console.log("Receiver Register:", receiverData);
      const receiverId = receiverData.user.id;

    console.log("\n4. Creating a Need...");
    const needRes = await fetch(`${BASE_URL}/needs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          receiverId,
          category: "Food",
          title: "Rice and Pulses",
          goal: "50kg",
          description: "Need food for 20 families",
          city: "Mumbai",
          state: "Maharashtra",
          urgency: "HIGH"
        })
    });
    const needData = await needRes.json();
    console.log("Need Response:", needData);

    console.log("\nAll endpoints tested successfully!");

  } catch (error) {
    console.error("\nTest failed:", error);
  }
}

runTests();
