import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { Layers, Workflow, ShieldCheck, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — SevaaSetu" },
      { name: "description", content: "SevaaSetu is a donation matching portal connecting donors and recipients with real-time needs through transparent, structured workflows." },
      { property: "og:title", content: "About SevaaSetu" },
      { property: "og:description", content: "How SevaaSetu bridges donors and recipients." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="mx-auto max-w-4xl px-6 py-20">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/30 px-3 py-1 text-xs font-semibold text-sage">
          About SevaaSetu
        </span>
        <h1 className="mt-5 font-display text-5xl font-bold tracking-tight text-balance">
          A bridge of service between those who can give and those who need.
        </h1>
        <p className="mt-5 text-lg text-muted-foreground">
          SevaaSetu (सेवा सेतु — "bridge of service") is a donation matching portal built by Team-16.
          It connects donors and recipients by pairing donations — items, funds, or services — with
          real-time needs from verified organizations. Every match is transparent, structured, and
          traceable end-to-end.
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {[
            { i: Workflow, t: "Real-time matching", d: "Needs and pledges meet by category, location, and urgency — the moment they're posted." },
            { i: ShieldCheck, t: "Verified on both sides", d: "Recipients pass KYC. Donors are vouched for. Trust is the default." },
            { i: Layers, t: "Structured data", d: "Every need and pledge is captured as structured data — auditable, searchable, exportable." },
            { i: Users, t: "Community-first", d: "Built with NGOs, kitchens, clinics, and schools — designed around how giving actually happens." },
          ].map((b) => (
            <div key={b.t} className="rounded-2xl border border-border bg-card p-6">
              <b.i className="h-5 w-5 text-primary" />
              <h2 className="mt-3 font-display text-xl font-semibold">{b.t}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">{b.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-3xl bg-sage p-10 text-sage-foreground shadow-glow">
          <h2 className="font-display text-2xl font-semibold">Built by Team-16</h2>
          <p className="mt-2 max-w-xl text-sage-foreground/85">
            A modern architecture for an old, beautiful idea — that everyone has something to give,
            and someone, somewhere, needs exactly that.
          </p>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
