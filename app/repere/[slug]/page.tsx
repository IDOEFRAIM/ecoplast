import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { lieux } from "@/lib/lieux";

export function generateStaticParams() {
  return lieux.map((l) => ({ slug: l.slug }));
}

export default function Page({ params }: PageProps<"/repere/[slug]">) {
  return (
    <Suspense fallback={<p className="p-6 text-center text-sm text-foreground/60">Chargement…</p>}>
      <Repere params={params} />
    </Suspense>
  );
}

async function Repere({ params }: Pick<PageProps<"/repere/[slug]">, "params">) {
  const { slug } = await params;
  const lieu = lieux.find((l) => l.slug === slug);
  if (!lieu) notFound();

  const pos = lieu.position;
  const d = 0.002;
  const carte = pos
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${pos.lng - d}%2C${pos.lat - d}%2C${pos.lng + d}%2C${pos.lat + d}&layer=mapnik&marker=${pos.lat}%2C${pos.lng}`
    : null;
  const autres = lieux.filter((l) => l.slug !== lieu.slug);

  return (
    <main className="mx-auto w-full max-w-xl pb-12">
      <header className="bg-brand px-5 py-5 text-center text-white">
        <Link href="/" className="block text-left text-sm text-white/80 underline">
          ← Fiche produit
        </Link>
        <p className="mt-2 text-xs uppercase tracking-widest text-white/70">Orientation et repérage</p>
        <h1 className="mt-1 text-2xl font-bold">Point de repère</h1>
      </header>

      <div className="px-4 pt-6">
        <div className="rounded-2xl bg-white p-6 text-center shadow-md">
          <p className="text-sm text-foreground/60">{lieu.indication}</p>
          <h2 className="mt-1 text-3xl font-bold text-brand">{lieu.nom}</h2>
          <div
            className="mx-auto mt-6 flex h-28 w-28 items-center justify-center rounded-full bg-brand-soft text-6xl text-brand"
            style={{ transform: `rotate(${lieu.fleche}deg)` }}
            aria-hidden
          >
            ↑
          </div>
          <p className="mt-6 leading-relaxed">{lieu.direction}</p>
        </div>

        {carte && pos ? (
          <section className="mt-4 overflow-hidden rounded-2xl bg-white shadow-md">
            <iframe src={carte} title={`Carte : ${lieu.nom}`} className="h-64 w-full border-0" loading="lazy" />
            <a
              href={`https://www.openstreetmap.org/?mlat=${pos.lat}&mlon=${pos.lng}#map=18/${pos.lat}/${pos.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-brand px-4 py-3 text-center font-semibold text-white"
            >
              Ouvrir la carte en grand
            </a>
          </section>
        ) : (
          <p className="mt-4 text-center text-sm text-foreground/60">
            Position non encore enregistrée pour ce lieu.
          </p>
        )}

        <section className="mt-6">
          <h3 className="font-semibold text-brand">Autres points de repère</h3>
          <ul className="mt-2 grid gap-2">
            {autres.map((l) => (
              <li key={l.slug}>
                <Link
                  href={`/repere/${l.slug}`}
                  className="flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-sm"
                >
                  <span className="font-medium">{l.nom}</span>
                  <span className="text-brand">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-6 rounded-lg bg-brand-soft px-3 py-2 text-xs text-brand">
          Démonstration : lieu fictif. Le QR code ne localise pas l&apos;utilisateur, la position
          est renseignée à l&apos;avance.
        </p>
      </div>
    </main>
  );
}
