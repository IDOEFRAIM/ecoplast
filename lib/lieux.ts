export type Point = { nom: string; type: "hopital" | "police" | "pharmacie" | "marche"; lat: number; lng: number };

export type Lieu = {
  slug: string;
  nom: string;
  indication: string;
  direction: string;
  fleche: number; // rotation en degrés, 0 = tout droit
  position: { lat: number; lng: number };
  points: Point[];
};

// Lieux et points stratégiques FICTIFS de démonstration : à remplacer par les données réelles du site de test.
const pointsDemo = (lat: number, lng: number): Point[] => [
  { nom: "Hôpital (démo)", type: "hopital", lat: lat + 0.006, lng: lng + 0.003 },
  { nom: "Poste de police (démo)", type: "police", lat: lat - 0.003, lng: lng + 0.005 },
  { nom: "Pharmacie (démo)", type: "pharmacie", lat: lat + 0.001, lng: lng - 0.004 },
  { nom: "Marché (démo)", type: "marche", lat: lat - 0.005, lng: lng - 0.002 },
];

export const lieux: Lieu[] = [
  {
    slug: "entree-principale",
    nom: "Entrée principale",
    indication: "Site de démonstration",
    direction: "Continuez tout droit sur l'allée pavée, puis tournez à droite au bâtiment A.",
    fleche: 0,
    position: { lat: 12.3714, lng: -1.5197 },
    points: pointsDemo(12.3714, -1.5197),
  },
  {
    slug: "parking-visiteurs",
    nom: "Parking visiteurs",
    indication: "Site de démonstration",
    direction: "Suivez la flèche gravée vers la gauche, environ 30 mètres.",
    fleche: -90,
    position: { lat: 12.3716, lng: -1.5201 },
    points: pointsDemo(12.3716, -1.5201),
  },
  {
    slug: "batiment-a",
    nom: "Bâtiment A",
    indication: "Site de démonstration",
    direction: "Tournez à droite : l'entrée du bâtiment est à environ 15 mètres.",
    fleche: 90,
    position: { lat: 12.3712, lng: -1.5193 },
    points: pointsDemo(12.3712, -1.5193),
  },
];
