"use client";

import { useState } from "react";
import type { Point } from "@/lib/lieux";

type Coord = { lat: number; lng: number };

const icones: Record<Point["type"], string> = { hopital: "🏥", police: "🚓", pharmacie: "💊", marche: "🛒" };

function distance(a: Coord, b: Coord) {
  const rad = (x: number) => (x * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 6371000 * 2 * Math.asin(Math.sqrt(h));
}

function format(m: number) {
  return m < 1000 ? `${Math.round(m / 10) * 10} m` : `${(m / 1000).toFixed(1).replace(".", ",")} km`;
}

export default function Proximite({ nom, position, points }: { nom: string; position: Coord; points: Point[] }) {
  const [moi, setMoi] = useState<Coord | null>(null);
  const [etat, setEtat] = useState<"attente" | "demande" | "refus">("attente");

  function localiser() {
    if (!navigator.geolocation) return setEtat("refus");
    setEtat("demande");
    navigator.geolocation.getCurrentPosition(
      (p) => {
        setMoi({ lat: p.coords.latitude, lng: p.coords.longitude });
        setEtat("attente");
      },
      () => setEtat("refus"),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }

  const origine = moi ?? position;
  const d = 0.004;
  const carte = `https://www.openstreetmap.org/export/embed.html?bbox=${origine.lng - d}%2C${origine.lat - d}%2C${origine.lng + d}%2C${origine.lat + d}&layer=mapnik&marker=${origine.lat}%2C${origine.lng}`;
  const tries = points
    .map((p) => ({ ...p, m: distance(origine, p) }))
    .sort((a, b) => a.m - b.m);

  return (
    <section className="mt-4 overflow-hidden rounded-2xl bg-white shadow-md">
      <iframe src={carte} title={`Carte : ${nom}`} className="h-64 w-full border-0" loading="lazy" />
      <div className="p-4">
        <p className="text-sm text-foreground/70">
          {moi ? "Votre position (GPS du téléphone)" : `Position enregistrée du pavé : ${nom}`}
        </p>
        <button
          onClick={localiser}
          disabled={etat === "demande"}
          className="mt-2 w-full rounded-xl bg-brand px-4 py-3 font-semibold text-white disabled:opacity-60"
        >
          {etat === "demande" ? "Localisation…" : moi ? "Actualiser ma position" : "📍 Me localiser"}
        </button>
        {etat === "refus" && (
          <p className="mt-2 text-xs text-foreground/60">
            Localisation indisponible ou refusée : les distances partent du pavé.
          </p>
        )}

        <h3 className="mt-5 font-semibold text-brand">Points stratégiques proches</h3>
        <ul className="mt-2 divide-y divide-black/5">
          {tries.map((p) => (
            <li key={p.nom} className="flex items-center justify-between py-2">
              <span>
                {icones[p.type]} {p.nom}
              </span>
              <a
                className="font-semibold text-brand underline"
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.openstreetmap.org/directions?from=${origine.lat}%2C${origine.lng}&to=${p.lat}%2C${p.lng}`}
              >
                {format(p.m)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
