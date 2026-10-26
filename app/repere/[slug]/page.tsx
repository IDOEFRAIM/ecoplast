import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { lieux } from "@/lib/lieux";
import Proximite from "./Proximite";

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

        <Proximite nom={lieu.nom} position={lieu.position} points={lieu.points} />

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
          Démonstration : lieu et points stratégiques fictifs. Le QR code ouvre la page ; la position
          de la personne vient du GPS du téléphone, avec son accord.
        </p>
      </div>
    </main>
  );
}
