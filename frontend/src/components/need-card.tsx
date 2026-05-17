import type { Need } from "@/lib/mock-data";
import { MapPin, Clock } from "lucide-react";

const urgencyStyles: Record<Need["urgency"], string> = {
  Critical: "bg-primary/15 text-primary",
  High: "bg-secondary/40 text-secondary-foreground",
  Moderate: "bg-accent/25 text-sage",
};

const categoryDot: Record<Need["category"], string> = {
  Food: "bg-primary",
  Clothing: "bg-secondary",
  Education: "bg-accent",
  Medical: "bg-destructive",
  Shelter: "bg-sage",
  Services: "bg-muted-foreground",
};

export function NeedCard({ need }: { need: Need }) {
  return (
    <article className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-glow">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <span className={`h-2 w-2 rounded-full ${categoryDot[need.category]}`} />
          {need.category}
        </div>
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${urgencyStyles[need.urgency]}`}>
          {need.urgency}
        </span>
      </div>

      <div>
        <h3 className="font-display text-lg font-semibold leading-snug text-balance">{need.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">by {need.org}</p>
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="font-medium text-foreground">{need.progress}% matched</span>
          <span className="text-muted-foreground">Goal: {need.goal}</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all"
            style={{ width: `${need.progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border/60 pt-3 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{need.location}</span>
        <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{need.posted}</span>
      </div>

      <button className="mt-1 inline-flex items-center justify-center rounded-lg bg-foreground px-3 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90">
        Match this need
      </button>
    </article>
  );
}
