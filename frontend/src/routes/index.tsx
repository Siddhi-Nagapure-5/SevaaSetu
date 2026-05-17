import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { NeedCard } from "@/components/need-card";
import { needs, stats } from "@/lib/mock-data";
import { ArrowRight, HandHeart, Sparkles, ShieldCheck, Activity } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Split-screen hero */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 grain opacity-40" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl gap-0 px-0 md:grid-cols-2">
          {/* Donor side */}
          <div className="relative flex flex-col justify-between gap-10 px-6 py-16 md:px-12 md:py-24">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <Sparkles className="h-3.5 w-3.5" /> For donors
              </span>
              <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] tracking-tight text-balance md:text-6xl">
                Give what you have.<br />
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Match a real need.</span>
              </h1>
              <p className="mt-5 max-w-md text-base text-muted-foreground">
                SevaaSetu routes your donation — items, funds, or services — to verified recipients
                whose needs match, in real time. No middlemen, no guesswork.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/donate" className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.02]">
                  Donate something <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/needs" className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted">
                  Browse live needs
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-sage" />
              Every recipient is KYC-verified · End-to-end donation trail
            </div>
          </div>

          {/* Recipient side */}
          <div className="relative flex flex-col justify-between gap-10 bg-sage px-6 py-16 text-sage-foreground md:px-12 md:py-24">
            <div className="absolute inset-0 grain opacity-20" aria-hidden />
            <div className="relative">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-background/15 px-3 py-1 text-xs font-semibold">
                <HandHeart className="h-3.5 w-3.5" /> For recipients
              </span>
              <h2 className="mt-5 font-display text-5xl font-bold leading-[1.05] tracking-tight text-balance md:text-6xl">
                Ask for what<br />
                <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">your community needs.</span>
              </h2>
              <p className="mt-5 max-w-md text-base text-sage-foreground/85">
                Post a need in seconds. Our matching engine surfaces nearby donors with the right
                resources — and tracks fulfilment transparently from pledge to delivery.
              </p>
              <div className="relative mt-7 flex flex-wrap gap-3">
                <Link to="/post-need" className="inline-flex items-center gap-1.5 rounded-full bg-background px-5 py-3 text-sm font-semibold text-foreground transition-transform hover:scale-[1.02]">
                  Post a need <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/about" className="inline-flex items-center gap-1.5 rounded-full border border-background/30 px-5 py-3 text-sm font-semibold text-sage-foreground transition-colors hover:bg-background/10">
                  How matching works
                </Link>
              </div>
            </div>
            <div className="relative flex items-center gap-3 text-xs text-sage-foreground/80">
              <Activity className="h-4 w-4" />
              Live updates · Auto-routing · Audit-ready records
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border/60 bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-card px-6 py-8 text-center md:py-10">
              <div className="font-display text-3xl font-bold tracking-tight text-primary md:text-4xl">{s.value}</div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Live needs preview */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/30 px-3 py-1 text-xs font-semibold text-sage">
              <Activity className="h-3.5 w-3.5" /> Live now
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">Needs awaiting a match</h2>
            <p className="mt-1 text-muted-foreground">Pick one that resonates. Or let us match for you.</p>
          </div>
          <Link to="/needs" className="hidden text-sm font-semibold text-primary hover:underline sm:inline">View all →</Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {needs.slice(0, 6).map((n) => <NeedCard key={n.id} need={n} />)}
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-border/60 bg-muted/40">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">How the bridge works</h2>
          <p className="mt-2 max-w-xl text-muted-foreground">Three steps from intent to impact.</p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { n: "01", t: "Post or pledge", d: "Recipients post structured needs. Donors pledge items, funds, or services." },
              { n: "02", t: "Smart matching", d: "Our engine pairs supply with demand by category, location, and urgency." },
              { n: "03", t: "Tracked fulfilment", d: "Every handoff is logged. Both sides get receipts and impact updates." },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border border-border bg-card p-6">
                <div className="font-display text-sm font-bold text-primary">{s.n}</div>
                <h3 className="mt-2 font-display text-xl font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
