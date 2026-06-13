import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { NeedCard } from "@/components/need-card";
import { needs, type Need } from "@/lib/mock-data";
import { Search } from "lucide-react";

export const Route = createFileRoute("/needs")({
  head: () => ({
    meta: [
      { title: "Live Needs — SevaaSetu" },
      { name: "description", content: "Browse verified, real-time needs from communities and match what you can give." },
      { property: "og:title", content: "Live Needs — SevaaSetu" },
      { property: "og:description", content: "Real-time needs awaiting a match." },
    ],
  }),
  component: NeedsPage,
});

const categories: ("All" | Need["category"])[] = ["All", "Food", "Clothing", "Education", "Medical", "Shelter", "Services"];
const urgencies: ("All" | Need["urgency"])[] = ["All", "Critical", "High", "Moderate"];

function NeedsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const [urg, setUrg] = useState<(typeof urgencies)[number]>("All");

  const filtered = useMemo(() => {
    return needs.filter((n) => {
      const matchCat = cat === "All" || n.category === cat;
      const matchUrg = urg === "All" || n.urgency === urg;
      const matchQ = !q || (n.title + n.org + n.location).toLowerCase().includes(q.toLowerCase());
      return matchCat && matchUrg && matchQ;
    });
  }, [q, cat, urg]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">Live needs</h1>
        <p className="mt-2 max-w-xl text-muted-foreground">
          Every need is verified and tracked. Filter by category or search by org and city.
        </p>

        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative md:w-80">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search need, org or city"
              className="w-full rounded-full border border-input bg-card py-2.5 pl-9 pr-4 text-sm outline-none ring-ring/40 transition-all focus:ring-2"
            />
          </div>
          <div className="flex flex-col gap-2 md:items-end">
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-semibold uppercase text-muted-foreground self-center mr-2">Category:</span>
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    cat === c
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs font-semibold uppercase text-muted-foreground self-center mr-2">Urgency:</span>
              {urgencies.map((u) => (
                <button
                  key={u}
                  onClick={() => setUrg(u)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    urg === u
                      ? "border-sage bg-sage text-sage-foreground"
                      : "border-border bg-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((n) => <NeedCard key={n.id} need={n} />)}
        </div>
        {filtered.length === 0 && (
          <div className="mt-16 rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
            No needs match your filters yet.
          </div>
        )}
      </section>
      <SiteFooter />
    </div>
  );
}
