import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import heroCat from "@/assets/hero-cat.jpg";
import productBed from "@/assets/product-bed.jpg";
import productScratcher from "@/assets/product-scratcher.jpg";
import productToys from "@/assets/product-toys.jpg";
import productBowl from "@/assets/product-bowl.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pussycat Mart — Order Cat Gear That Gives Back" },
      {
        name: "description",
        content:
          "Shop beds, scratchers, toys and bowls for your cat. Every Pussycat Mart order donates to cat rescues and no-kill shelters.",
      },
      { property: "og:title", content: "Pussycat Mart — The Purrfect Choice for Your Cat" },
      {
        property: "og:description",
        content:
          "We don't just sell products, we give back. Every order funds cat rescues and no-kill shelters.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Store",
          name: "Pussycat Mart",
          description:
            "Dropship cat supplies that fund cat rescues and no-kill shelters.",
        }),
      },
    ],
  }),
  component: Index,
});

type Product = {
  id: string;
  name: string;
  blurb: string;
  price: number;
  image: string;
  tag: string;
  tint: string;
  tilt: string;
};

const PRODUCTS: Product[] = [
  {
    id: "bed",
    name: "Cloud Nap Cat Cave",
    blurb: "Felt hideaway with a plush cushion. 18 hours of snoozing, guaranteed.",
    price: 48,
    image: productBed,
    tag: "ZZZ!",
    tint: "bg-fun-pink",
    tilt: "-rotate-2",
  },
  {
    id: "scratcher",
    name: "Oak & Sisal Scratch Tower",
    blurb: "Solid wood, two perches, sisal your sofa will thank you for.",
    price: 89,
    image: productScratcher,
    tag: "SHRED!",
    tint: "bg-fun-teal",
    tilt: "rotate-2",
  },
  {
    id: "toys",
    name: "Feather Frenzy Toy Set",
    blurb: "Five feather wands and one catnip mouse of pure chaos.",
    price: 19,
    image: productToys,
    tag: "ZOOM!",
    tint: "bg-fun-yellow",
    tilt: "-rotate-1",
  },
  {
    id: "bowl",
    name: "Slow Sip Ceramic Diner",
    blurb: "Elevated double bowls. Fine dining for a very small critic.",
    price: 34,
    image: productBowl,
    tag: "NOM!",
    tint: "bg-fun-lime",
    tilt: "rotate-1",
  },
];

const DONATION_RATE = 0.1;
const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

function Index() {
  const [qty, setQty] = useState<Record<string, number>>({});
  const [sneakyCat, setSneakyCat] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSneakyCat(Math.floor(Math.random() * PRODUCTS.length));
      window.setTimeout(() => setSneakyCat(null), 2200);
    }, 9000);
    return () => window.clearInterval(timer);
  }, []);
  const [placed, setPlaced] = useState<string | null>(null);

  const items = useMemo(() => PRODUCTS.filter((p) => (qty[p.id] ?? 0) > 0), [qty]);
  const subtotal = items.reduce((sum, p) => sum + p.price * (qty[p.id] ?? 0), 0);
  const donation = subtotal * DONATION_RATE;
  const shipping = subtotal > 0 && subtotal < 75 ? 6.95 : 0;
  const total = subtotal + shipping;

  const setCount = (id: string, next: number) =>
    setQty((prev) => ({ ...prev, [id]: Math.max(0, Math.min(99, next)) }));

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setPlaced(String(data.get("name") || "friend"));
    e.currentTarget.reset();
    setQty({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen">
      <div className="border-b-4 border-border bg-fun-purple py-2 text-center text-sm font-extrabold uppercase tracking-widest text-primary-foreground">
        🐾 10% of every order feeds a rescue cat 🐾 free shipping over $75 🐾
      </div>

      <header className="sticky top-0 z-20 border-b-4 border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3">
          <a
            href="#top"
            className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-foreground sm:text-2xl"
          >
            PUSSYCAT<span className="text-primary">MART</span>
          </a>
          <nav className="flex items-center gap-4 text-sm font-extrabold">
            <a href="#shop" className="hidden text-foreground hover:text-primary sm:inline">
              Shop
            </a>
            <a href="#giveback" className="hidden text-foreground hover:text-primary sm:inline">
              Give Back
            </a>
            <a
              href="#order"
              className="btn-pop rounded-full bg-primary px-4 py-2 text-primary-foreground"
            >
              Order now
            </a>
          </nav>
        </div>
      </header>

      <section id="top" className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 lg:grid-cols-2 lg:py-16">
        <div>
          <p className="inline-flex -rotate-2 rounded-full border-[3px] border-border bg-fun-yellow px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-foreground shadow-[var(--shadow-soft)]">
            The purrfect donation
          </p>
          <h1 className="mt-6 text-5xl font-bold leading-[0.95] text-foreground sm:text-6xl">
            The <span className="text-primary">purrfect</span> choice for your{" "}
            <span className="text-fun-purple">cat</span>.
          </h1>
          <p className="mt-5 max-w-lg text-lg font-semibold text-muted-foreground">
            We don't just sell products — we give back. Every Pussycat Mart order
            sends {Math.round(DONATION_RATE * 100)}% straight to cat rescues and
            no-kill shelters, then ships direct to your door.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#shop"
              className="btn-pop rounded-full bg-primary px-7 py-3 text-lg font-extrabold text-primary-foreground"
            >
              Shop the shelf
            </a>
            <a
              href="#giveback"
              className="btn-pop rounded-full bg-fun-teal px-7 py-3 text-lg font-extrabold text-foreground"
            >
              How we give back
            </a>
          </div>
        </div>
        <div className="relative">
          <img
            src={heroCat}
            alt="Happy rescue cat lounging on a cream blanket beside toys and a food bowl"
            width={1600}
            height={1100}
            fetchPriority="high"
            decoding="async"
            className="w-full rotate-1 rounded-[var(--radius-3xl)] border-[5px] border-border object-cover shadow-[var(--shadow-lift)]"
          />
          <span className="absolute -left-3 -top-5 -rotate-12 rounded-full border-[3px] border-border bg-fun-lime px-4 py-2 font-[family-name:var(--font-display)] text-sm font-bold text-foreground shadow-[var(--shadow-soft)] [animation:var(--animate-wiggle)]">
            MEOW!
          </span>
          <span className="absolute -bottom-5 right-2 rotate-6 rounded-full border-[3px] border-border bg-fun-pink px-4 py-2 font-[family-name:var(--font-display)] text-sm font-bold text-foreground shadow-[var(--shadow-soft)] [animation:var(--animate-bounce-slow)]">
            100% cat-approved
          </span>
        </div>
      </section>

      <section id="shop" className="mx-auto max-w-6xl px-5 py-12">
        <h2 className="text-4xl font-bold text-foreground">Build your order 🧺</h2>
        <p className="mt-2 text-lg font-semibold text-muted-foreground">
          Tap the plus. Spoil the cat. Free shipping over {currency.format(75)}.
        </p>
        <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((p, i) => (
            <article
              key={p.id}
              className={`card-pop relative flex flex-col overflow-hidden rounded-[var(--radius-2xl)] bg-card ${p.tilt}`}
            >
              {sneakyCat === i && <span aria-hidden="true" className="pointer-events-none absolute -right-2 top-14 z-20 text-6xl opacity-0 [animation:cat-peek_2.2s_ease-in-out_forwards]">🐈‍⬛</span>}
              <span className="absolute left-3 top-3 z-10 -rotate-6 rounded-full border-[3px] border-border bg-background px-3 py-1 font-[family-name:var(--font-display)] text-xs font-bold text-foreground">
                {p.tag}
              </span>
              <button type="button" onClick={() => setSelectedProduct(p)} className={`${p.tint} group block border-b-[3px] border-border text-left`} aria-label={`View details for ${p.name}`}>
                <img
                  src={p.image}
                  alt={p.name}
                  width={900}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 25vw"
                  className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="block bg-background/90 px-4 py-2 text-center text-xs font-extrabold uppercase tracking-wide text-foreground">View product details</span>
              </button>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <button type="button" onClick={() => setSelectedProduct(p)} className="text-left text-lg font-bold text-card-foreground hover:text-primary">{p.name}</button>
                <p className="flex-1 text-sm font-semibold text-muted-foreground">{p.blurb}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-[family-name:var(--font-display)] text-2xl font-bold text-primary">
                    {currency.format(p.price)}
                  </span>
                  <div className="flex items-center gap-1 rounded-full border-[3px] border-border bg-background px-2 py-1">
                    <button
                      type="button"
                      aria-label={`Remove one ${p.name}`}
                      onClick={() => setCount(p.id, (qty[p.id] ?? 0) - 1)}
                      className="h-7 w-7 rounded-full text-xl font-bold leading-none text-foreground hover:bg-secondary"
                    >
                      –
                    </button>
                    <span className="w-6 text-center font-extrabold">{qty[p.id] ?? 0}</span>
                    <button
                      type="button"
                      aria-label={`Add one ${p.name}`}
                      onClick={() => setCount(p.id, (qty[p.id] ?? 0) + 1)}
                      className="h-7 w-7 rounded-full text-xl font-bold leading-none text-primary hover:bg-secondary"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="giveback" className="mx-auto max-w-6xl px-5 py-12">
        <div
          className="rounded-[var(--radius-3xl)] border-[5px] border-border p-8 text-foreground shadow-[var(--shadow-lift)] sm:p-12"
          style={{ backgroundImage: "var(--gradient-pop)" }}
        >
          <h2 className="text-4xl font-bold">The purrfect donation 💛</h2>
          <p className="mt-4 max-w-2xl text-lg font-semibold">
            Ten percent of every order goes to vetted cat rescues and no-kill
            shelters — food, vet care, and safe places to wait for a forever home.
          </p>
          <dl className="mt-9 grid gap-5 sm:grid-cols-3">
            {[
              ["10%", "of every order donated", "bg-fun-yellow"],
              ["No-kill", "shelters only, always", "bg-background"],
              ["Free $75+", "direct-ship to your door", "bg-fun-pink"],
            ].map(([big, small, tint]) => (
              <div
                key={big}
                className={`rounded-[var(--radius-xl)] border-[3px] border-border ${tint} p-5 shadow-[var(--shadow-soft)]`}
              >
                <dt className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground">
                  {big}
                </dt>
                <dd className="mt-1 text-sm font-bold text-foreground">{small}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="order" className="mx-auto max-w-6xl px-5 py-12 pb-20">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <form
            onSubmit={submit}
            className="rounded-[var(--radius-2xl)] border-[4px] border-border bg-card p-6 shadow-[var(--shadow-lift)] sm:p-8"
          >
            <h2 className="text-3xl font-bold text-card-foreground">Where's it going? 📦</h2>
            {placed && (
              <p className="mt-4 rounded-[var(--radius-lg)] border-[3px] border-border bg-fun-lime p-4 text-sm font-extrabold text-foreground">
                Thanks {placed}! Your order request is in — we'll email confirmation
                and tracking, and your donation is on its way to a shelter. 🐈
              </p>
            )}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Full name" name="name" autoComplete="name" />
              <Field label="Email" name="email" type="email" autoComplete="email" />
              <div className="sm:col-span-2">
                <Field label="Street address" name="address" autoComplete="street-address" />
              </div>
              <Field label="City" name="city" autoComplete="address-level2" />
              <Field label="State" name="state" autoComplete="address-level1" />
              <Field label="ZIP code" name="zip" autoComplete="postal-code" />
              <Field label="Phone" name="phone" type="tel" required={false} autoComplete="tel" />
              <div className="sm:col-span-2">
                <label className="block text-sm font-extrabold text-card-foreground" htmlFor="notes">
                  Order notes <span className="font-semibold text-muted-foreground">(optional)</span>
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  placeholder="Cat's name? Gift note? Tell us."
                  className="mt-2 w-full rounded-[var(--radius-md)] border-[3px] border-border bg-background px-3 py-2 text-sm font-semibold outline-none focus:border-ring"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={items.length === 0}
              className="btn-pop mt-7 w-full rounded-full bg-primary px-6 py-3 text-lg font-extrabold text-primary-foreground disabled:translate-x-0 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {items.length === 0
                ? "Add a product to order"
                : `Place order · ${currency.format(total)}`}
            </button>
          </form>

          <aside aria-live="polite" className="h-fit rotate-1 rounded-[var(--radius-2xl)] border-[4px] border-border bg-secondary p-6 shadow-[var(--shadow-lift)] sm:p-8">
            <h2 className="text-3xl font-bold text-secondary-foreground">Your basket 🛒</h2>
            {items.length === 0 ? (
              <p className="mt-4 text-sm font-bold text-muted-foreground">
                Nothing here yet — as empty as a freshly scooped litter box.
              </p>
            ) : (
              <ul className="mt-4 space-y-3">
                {items.map((p) => (
                  <li key={p.id} className="flex justify-between gap-4 text-sm font-bold">
                    <span className="text-foreground">
                      {p.name} × {qty[p.id]}
                    </span>
                    <span className="text-foreground">
                      {currency.format(p.price * (qty[p.id] ?? 0))}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <dl className="mt-6 space-y-2 border-t-[3px] border-border pt-4 text-sm">
              <Row label="Subtotal" value={currency.format(subtotal)} />
              <Row label="Shipping" value={shipping === 0 ? "Free" : currency.format(shipping)} />
              <Row label="Shelter donation" value={currency.format(donation)} accent />
              <div className="flex justify-between border-t-[3px] border-border pt-3 font-[family-name:var(--font-display)] text-xl font-bold text-foreground">
                <dt>Total</dt>
                <dd>{currency.format(total)}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      {selectedProduct && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/60 p-4" role="dialog" aria-modal="true" aria-labelledby="product-dialog-title" onClick={() => setSelectedProduct(null)}>
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[var(--radius-3xl)] border-[5px] border-border bg-background shadow-[var(--shadow-lift)]" onClick={(event) => event.stopPropagation()}>
            <div className={`${selectedProduct.tint} relative border-b-[3px] border-border`}>
              <button type="button" onClick={() => setSelectedProduct(null)} aria-label="Close product details" className="absolute right-3 top-3 z-10 h-10 w-10 rounded-full border-[3px] border-border bg-background text-2xl font-bold">×</button>
              <img src={selectedProduct.image} alt={selectedProduct.name} className="max-h-[55vh] w-full object-contain" />
            </div>
            <div className="p-6 sm:p-8"><span className="rounded-full border-[3px] border-border bg-fun-yellow px-3 py-1 text-xs font-extrabold uppercase">{selectedProduct.tag}</span><h2 id="product-dialog-title" className="mt-4 text-3xl font-bold">{selectedProduct.name}</h2><p className="mt-3 text-lg font-semibold text-muted-foreground">{selectedProduct.blurb}</p><div className="mt-6 flex items-center justify-between gap-4"><span className="font-[family-name:var(--font-display)] text-3xl font-bold text-primary">{currency.format(selectedProduct.price)}</span><button type="button" onClick={() => { setCount(selectedProduct.id, (qty[selectedProduct.id] ?? 0) + 1); setSelectedProduct(null); }} className="btn-pop rounded-full bg-primary px-6 py-3 font-extrabold text-primary-foreground">Add to order</button></div></div>
          </div>
        </div>
      )}

      <footer className="border-t-4 border-border bg-fun-purple">
        <div className="mx-auto max-w-6xl px-5 py-8 text-sm font-bold text-primary-foreground">
          🐾 © {new Date().getFullYear()} Pussycat Mart — the purrfect choice for your cat.
        </div>
      </footer>
    </main>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = true,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-extrabold text-card-foreground" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="mt-2 w-full rounded-[var(--radius-md)] border-[3px] border-border bg-background px-3 py-2 text-sm font-semibold outline-none focus:border-ring"
      />
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between font-bold">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={accent ? "text-primary" : "text-foreground"}>{value}</dd>
    </div>
  );
}
