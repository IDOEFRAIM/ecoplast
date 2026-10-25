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

  return (
    <main className="mx-auto w-full max-w-xl pb-12">
      <header className="bg-brand px-5 py-6 text-center text-white">
        <p className="text-xs uppercase tracking-widest text-white/70">Orientation et repérage</p>
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

        {lieu.position ? (
          <a
            href={`https://www.openstreetmap.org/?mlat=${lieu.position.lat}&mlon=${lieu.position.lng}#map=18/${lieu.position.lat}/${lieu.position.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block rounded-xl bg-brand px-4 py-3 text-center font-semibold text-white"
          >
            Voir sur la carte
          </a>
        ) : (
          <p className="mt-4 text-center text-sm text-foreground/60">
            Position non encore enregistrée pour ce lieu.
          </p>
        )}

        <p className="mt-4 rounded-lg bg-brand-soft px-3 py-2 text-xs text-brand">
          Démonstration : lieu fictif. Le QR code ne localise pas l&apos;utilisateur, la position
          est renseignée à l&apos;avance.
        </p>

        <Link href="/" className="mt-6 block text-center text-sm font-medium text-brand underline">
          ← Retour à la fiche produit
        </Link>
      </div>
    </main>
  );
}
