import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { Check, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/post-need")({
  head: () => ({
    meta: [
      { title: "Post a Need — SevaaSetu" },
      { name: "description", content: "Post a structured need on SevaaSetu — category, location, urgency and details — and get matched with donors in real time." },
      { property: "og:title", content: "Post a Need — SevaaSetu" },
      { property: "og:description", content: "Post a structured need and get matched with donors in real time." },
    ],
  }),
  component: PostNeedPage,
});

const categories = ["Food", "Clothing", "Education", "Medical", "Shelter", "Services"] as const;
const urgencies = [
  { id: "Critical", hint: "Within 24 hours" },
  { id: "High", hint: "Within a few days" },
  { id: "Moderate", hint: "Within 2 weeks" },
] as const;

type Category = (typeof categories)[number];
type Urgency = (typeof urgencies)[number]["id"];

type FormState = {
  title: string;
  org: string;
  category: Category;
  city: string;
  state: string;
  urgency: Urgency;
  goal: string;
  description: string;
  contact: string;
};

const initial: FormState = {
  title: "",
  org: "",
  category: "Food",
  city: "",
  state: "",
  urgency: "High",
  goal: "",
  description: "",
  contact: "",
};

function PostNeedPage() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState<FormState | null>(null);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const validate = (f: FormState) => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (f.title.trim().length < 6) e.title = "Give it a clear title (min 6 chars).";
    if (f.title.length > 120) e.title = "Keep the title under 120 characters.";
    if (f.org.trim().length < 2) e.org = "Organization name is required.";
    if (f.city.trim().length < 2) e.city = "City is required.";
    if (f.state.trim().length < 2) e.state = "State is required.";
    if (f.goal.trim().length < 1) e.goal = "Add a goal (e.g. '200 blankets' or '₹50,000').";
    if (f.description.trim().length < 20) e.description = "Add a short description (min 20 chars).";
    if (f.description.length > 800) e.description = "Keep description under 800 chars.";
    if (!/^\S+@\S+\.\S+$/.test(f.contact) && !/^\+?[0-9\s-]{7,}$/.test(f.contact))
      e.contact = "Enter a valid email or phone.";
    return e;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate(form);
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setSubmitted(form);
      setForm(initial);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <section className="mx-auto max-w-2xl px-6 py-20">
          <div className="rounded-3xl border border-accent/60 bg-accent/15 p-8">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-sage text-sage-foreground">
              <Check className="h-5 w-5" />
            </div>
            <h1 className="mt-5 font-display text-3xl font-bold tracking-tight">Need posted</h1>
            <p className="mt-2 text-muted-foreground">
              "<span className="font-medium text-foreground">{submitted.title}</span>" is now live.
              Our matching engine is surfacing donors in {submitted.city} who can help.
            </p>
            <dl className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-border bg-card p-5 text-sm">
              <Info label="Category" value={submitted.category} />
              <Info label="Urgency" value={submitted.urgency} />
              <Info label="Location" value={`${submitted.city}, ${submitted.state}`} />
              <Info label="Goal" value={submitted.goal} />
            </dl>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => setSubmitted(null)}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.02]"
              >
                Post another need <ArrowRight className="h-4 w-4" />
              </button>
              <Link
                to="/needs"
                className="inline-flex items-center rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold hover:bg-muted"
              >
                Browse live needs
              </Link>
            </div>
          </div>
        </section>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/30 px-3 py-1 text-xs font-semibold text-sage">
            For recipients
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl text-balance">
            Post a need
          </h1>
          <p className="mt-3 max-w-md text-muted-foreground">
            Structured posts get matched faster. Be specific about what, where, and how urgent.
          </p>

          <form className="mt-8 space-y-6" onSubmit={onSubmit} noValidate>
            <Field
              label="Need title"
              placeholder="200 winter blankets for shelter"
              value={form.title}
              onChange={(v) => update("title", v)}
              error={errors.title}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Organization"
                placeholder="Aasha Foundation"
                value={form.org}
                onChange={(v) => update("org", v)}
                error={errors.org}
              />
              <Field
                label="Goal"
                placeholder="200 blankets · ₹50,000 · 20 hrs"
                value={form.goal}
                onChange={(v) => update("goal", v)}
                error={errors.goal}
              />
            </div>

            <div>
              <Label>Category</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {categories.map((c) => (
                  <Chip key={c} active={form.category === c} onClick={() => update("category", c)}>
                    {c}
                  </Chip>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="City"
                placeholder="Pune"
                value={form.city}
                onChange={(v) => update("city", v)}
                error={errors.city}
              />
              <Field
                label="State"
                placeholder="Maharashtra"
                value={form.state}
                onChange={(v) => update("state", v)}
                error={errors.state}
              />
            </div>

            <div>
              <Label>Urgency</Label>
              <div className="mt-2 grid gap-2 sm:grid-cols-3">
                {urgencies.map((u) => {
                  const active = form.urgency === u.id;
                  return (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => update("urgency", u.id)}
                      className={`rounded-xl border p-3 text-left transition-all ${
                        active
                          ? "border-primary bg-primary/5 shadow-soft"
                          : "border-border bg-card hover:border-foreground/30"
                      }`}
                    >
                      <div className={`font-display text-sm font-semibold ${active ? "text-primary" : ""}`}>
                        {u.id}
                      </div>
                      <div className="text-xs text-muted-foreground">{u.hint}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <Field
              label="Description"
              placeholder="Who this serves, what's needed, drop-off or pickup details…"
              value={form.description}
              onChange={(v) => update("description", v)}
              error={errors.description}
              textarea
              hint={`${form.description.length}/800`}
            />

            <Field
              label="Contact (email or phone)"
              placeholder="ops@aasha.org or +91 98xxxxxx"
              value={form.contact}
              onChange={(v) => update("contact", v)}
              error={errors.contact}
            />

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.01] sm:w-auto"
            >
              Post need
            </button>
          </form>
        </div>

        <aside className="relative h-fit overflow-hidden rounded-3xl bg-sage p-8 text-sage-foreground shadow-glow">
          <div className="absolute inset-0 grain opacity-15" aria-hidden />
          <div className="relative">
            <h2 className="font-display text-2xl font-semibold">Tips for fast matching</h2>
            <ul className="mt-6 space-y-4 text-sm text-sage-foreground/90">
              {[
                "Be specific in the title — quantity, item, beneficiary.",
                "Pick the tightest category that fits.",
                "Set urgency honestly — donors trust accuracy.",
                "Mention pickup window and drop-off address in the description.",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
      <SiteFooter />
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{children}</span>;
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  error,
  textarea,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  textarea?: boolean;
  hint?: string;
}) {
  const base =
    "mt-1.5 w-full rounded-xl border bg-card px-4 py-2.5 text-sm outline-none ring-ring/40 transition-all focus:ring-2";
  const cls = `${base} ${error ? "border-destructive" : "border-input"}`;
  return (
    <label className="block">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        {hint && <span className="text-[11px] text-muted-foreground">{hint}</span>}
      </div>
      {textarea ? (
        <textarea
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cls}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cls}
        />
      )}
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </label>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 font-medium">{value}</dd>
    </div>
  );
}
