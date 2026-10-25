export type Lieu = {
  slug: string;
  nom: string;
  indication: string;
  direction: string;
  fleche: number; // rotation en degrés, 0 = tout droit
  position?: { lat: number; lng: number };
};

// Lieux fictifs de démonstration. Les coordonnées sont à renseigner pour afficher une carte.
export const lieux: Lieu[] = [
  {
    slug: "entree-principale",
    nom: "Entrée principale",
    indication: "Site de démonstration",
    direction: "Continuez tout droit sur l'allée pavée, puis tournez à droite au bâtiment A.",
    fleche: 0,
    position: { lat: 12.3714, lng: -1.5197 },
  },
  {
    slug: "parking-visiteurs",
    nom: "Parking visiteurs",
    indication: "Site de démonstration",
    direction: "Suivez la flèche gravée vers la gauche, environ 30 mètres.",
    fleche: -90,
    position: { lat: 12.3716, lng: -1.5201 },
  },
  {
    slug: "batiment-a",
    nom: "Bâtiment A",
    indication: "Site de démonstration",
    direction: "Tournez à droite : l'entrée du bâtiment est à environ 15 mètres.",
    fleche: 90,
  },
];
