import Image from "next/image";
import Link from "next/link";

const innovations = [
  ["♻", "Plastique recyclé", "Valorisation de déchets plastiques collectés dans la fabrication."],
  ["◐", "Drainage", "Conception visant à faciliter la gestion et l'évacuation de l'eau."],
  ["⬡", "Système autobloquant", "Forme pensée pour permettre l'emboîtement des pavés entre eux."],
  ["✦", "Graphismes traditionnels", "Motifs décoratifs inspirés des formes et références culturelles burkinabè."],
  ["➚", "Orientation physique", "Flèches, symboles directionnels ou repères visibles au sol sur certains pavés."],
  ["▦", "QR code intégré", "Accès aux informations du produit et démonstration du repérage des lieux."],
];

const couleurs = [
  ["Gris anthracite", "#3a3d3f"],
  ["Terre cuite / ocre", "#b8603a"],
  ["Sable / beige", "#cdb99a"],
  ["Rouge brun", "#8e3b2e"],
  ["Vert urbain", "#5f7a4b"],
];

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-xl pb-12">
      <header className="bg-brand px-5 pb-8 pt-8 text-center text-white">
        <p className="text-2xl">♻</p>
        <h1 className="mt-1 text-3xl font-bold tracking-wide">PAVÉ INTELLIGENT</h1>
        <p className="mt-1 text-sm text-white/80">Plastique recyclé · Innovation burkinabè</p>
      </header>

      <div className="-mt-4 px-4">
        <div className="overflow-hidden rounded-2xl bg-white shadow-md">
          <Image
            src="/pave.webp"
            alt="Pavé intelligent : pavé octogonal gris avec flèche Nord, motifs gravés, zone drainante centrale et QR code"
            width={726}
            height={682}
            priority
            className="aspect-[726/625] w-full object-cover object-top"
          />
        </div>

        <section className="mt-6">
          <h2 className="text-xl font-semibold text-brand">Présentation du produit</h2>
          <p className="mt-2 leading-relaxed text-foreground/80">
            Le pavé intelligent en plastique recyclé est un concept de pavé conçu pour associer
            valorisation des déchets plastiques, aménagement des espaces extérieurs et solutions
            de repérage grâce à des symboles directionnels et à un QR code.
          </p>
          <p className="mt-3 rounded-lg bg-brand-soft px-3 py-2 text-sm text-brand">
            Prototype en cours de développement : les caractéristiques présentées sont celles du
            concept, non certifiées à ce stade.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold text-brand">Dimensions</h2>
          <dl className="mt-3 grid grid-cols-3 gap-3 text-center">
            {[
              ["19,5 cm", "Longueur"],
              ["11,5 cm", "Côté / largeur"],
              ["5 cm", "Épaisseur"],
            ].map(([v, l]) => (
              <div key={l} className="rounded-xl bg-white p-3 shadow-sm">
                <dt className="text-xs text-foreground/60">{l}</dt>
                <dd className="mt-1 text-lg font-bold text-brand">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-2 text-xs text-foreground/60">
            Dimensions indicatives, à confirmer à partir du dessin technique.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold text-brand">Innovations intégrées</h2>
          <ul className="mt-3 grid gap-3">
            {innovations.map(([icone, titre, texte]) => (
              <li key={titre} className="flex gap-3 rounded-xl bg-white p-4 shadow-sm">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-soft text-lg text-brand">
                  {icone}
                </span>
                <div>
                  <h3 className="font-semibold">{titre}</h3>
                  <p className="text-sm text-foreground/70">{texte}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold text-brand">Couleurs envisagées</h2>
          <ul className="mt-3 flex flex-wrap gap-4">
            {couleurs.map(([nom, hex]) => (
              <li key={nom} className="flex w-[4.5rem] flex-col items-center text-center">
                <span
                  className="h-14 w-14 rounded-full border-2 border-white shadow"
                  style={{ background: hex }}
                />
                <span className="mt-1 text-xs">{nom}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-foreground/70">
            Motifs traditionnels : inspirations géométriques burkinabè, possibilités de
            personnalisation selon les lieux et les projets.
          </p>
        </section>

        <section className="mt-8 rounded-2xl bg-brand p-5 text-white">
          <h2 className="text-xl font-semibold">Orientation et repérage par QR code</h2>
          <p className="mt-2 text-sm text-white/85">
            Le QR code peut afficher le nom d&apos;un lieu, une indication et une direction à
            suivre. Il ne détecte pas la position de l&apos;utilisateur : le lieu est enregistré
            à l&apos;avance.
          </p>
          <p className="mt-3 text-xs uppercase tracking-wider text-white/60">
            Exemple de démonstration
          </p>
          <Link
            href="/repere/entree-principale"
            className="mt-2 block rounded-xl bg-white px-4 py-3 text-center font-semibold text-brand"
          >
            Point de repère : Entrée principale →
          </Link>
        </section>

        <footer className="mt-8 text-center text-xs text-foreground/50">
          Innover · Valoriser · Construire un avenir durable
        </footer>
      </div>
    </main>
  );
}
