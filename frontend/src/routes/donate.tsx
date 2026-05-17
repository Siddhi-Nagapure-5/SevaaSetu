import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { Package, IndianRupee, Wrench, Check } from "lucide-react";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Donate — SevaaSetu" },
      { name: "description", content: "Pledge items, funds, or services. SevaaSetu matches your gift to a verified, real-time need." },
      { property: "og:title", content: "Donate — SevaaSetu" },
      { property: "og:description", content: "Pledge items, funds, or services on SevaaSetu." },
    ],
  }),
  component: DonatePage,
});

type Kind = "items" | "funds" | "services";

const kinds: { id: Kind; label: string; icon: typeof Package; hint: string }[] = [
  { id: "items", label: "Items", icon: Package, hint: "Clothes, food, books, supplies" },
  { id: "funds", label: "Funds", icon: IndianRupee, hint: "One-time or recurring gift" },
  { id: "services", label: "Services", icon: Wrench, hint: "Skills, time, professional help" },
];

function DonatePage() {
  const [kind, setKind] = useState<Kind>("items");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            Pledge a donation
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl text-balance">
            What would you like to give today?
          </h1>
          <p className="mt-3 max-w-md text-muted-foreground">
            Tell us what you have. We'll route it to a verified recipient whose need matches — and
            keep you in the loop until it arrives.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {kinds.map((k) => {
              const active = kind === k.id;
              return (
                <button
                  key={k.id}
                  onClick={() => setKind(k.id)}
                  className={`rounded-2xl border p-4 text-left transition-all ${
                    active
                      ? "border-primary bg-primary/5 shadow-soft"
                      : "border-border bg-card hover:border-foreground/30"
                  }`}
                >
                  <k.icon className={`h-5 w-5 ${active ? "text-primary" : "text-muted-foreground"}`} />
                  <div className="mt-3 font-display text-base font-semibold">{k.label}</div>
                  <div className="text-xs text-muted-foreground">{k.hint}</div>
                </button>
              );
            })}
          </div>

          {submitted ? (
            <div className="mt-8 flex items-start gap-3 rounded-2xl border border-accent/60 bg-accent/15 p-5">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-sage text-sage-foreground">
                <Check className="h-4 w-4" />
              </div>
              <div>
                <div className="font-display font-semibold">Pledge received</div>
                <p className="text-sm text-muted-foreground">
                  We're matching your {kind} pledge now. You'll get a confirmation within minutes.
                </p>
              </div>
            </div>
          ) : (
            <form
              className="mt-8 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Your name" placeholder="Aanya Verma" />
                <Field label="City" placeholder="Pune" />
              </div>
              <Field
                label={kind === "funds" ? "Amount (₹)" : kind === "items" ? "What & how many" : "Service offered"}
                placeholder={kind === "funds" ? "5000" : kind === "items" ? "20 blankets, lightly used" : "Pediatric consults, 2 hrs/week"}
              />
              <Field label="Notes (optional)" placeholder="Pickup window, condition, etc." textarea />
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.01] sm:w-auto"
              >
                Submit pledge
              </button>
            </form>
          )}
        </div>

        <aside className="relative h-fit overflow-hidden rounded-3xl bg-sage p-8 text-sage-foreground shadow-glow">
          <div className="absolute inset-0 grain opacity-15" aria-hidden />
          <div className="relative">
            <h2 className="font-display text-2xl font-semibold">Why pledge through SevaaSetu?</h2>
            <ul className="mt-6 space-y-4 text-sm">
              {[
                "Verified recipients only — every org passes KYC checks.",
                "Real-time matching by category, location, and urgency.",
                "Structured handoffs — receipts, photos, and impact notes.",
                "Zero platform fees on item and service pledges.",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                  <span className="text-sage-foreground/90">{t}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-2xl bg-background/10 p-4 text-sm">
              <div className="font-display text-xs uppercase tracking-wider text-sage-foreground/70">Today on SevaaSetu</div>
              <div className="mt-1 font-display text-2xl font-bold">142 pledges matched</div>
            </div>
          </div>
        </aside>
      </section>
      <SiteFooter />
    </div>
  );
}

function Field({
  label,
  placeholder,
  textarea,
}: {
  label: string;
  placeholder?: string;
  textarea?: boolean;
}) {
  const cls =
    "mt-1.5 w-full rounded-xl border border-input bg-card px-4 py-2.5 text-sm outline-none ring-ring/40 transition-all focus:ring-2";
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      {textarea ? (
        <textarea rows={3} placeholder={placeholder} className={cls} />
      ) : (
        <input placeholder={placeholder} className={cls} />
      )}
    </label>
  );
}
