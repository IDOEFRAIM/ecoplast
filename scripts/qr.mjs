// Usage : npm run qr -- https://votre-site.example
import QRCode from "qrcode";
import { mkdirSync } from "node:fs";

const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const cibles = {
  "qr-fiche-produit": base + "/",
  "qr-entree-principale": base + "/repere/entree-principale",
  "qr-parking-visiteurs": base + "/repere/parking-visiteurs",
  "qr-batiment-a": base + "/repere/batiment-a",
};
mkdirSync("public/qr", { recursive: true });
for (const [nom, url] of Object.entries(cibles)) {
  await QRCode.toFile(`public/qr/${nom}.png`, url, { width: 800, margin: 2, errorCorrectionLevel: "H" });
  console.log(nom, "->", url);
}
