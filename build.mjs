import { cp, mkdir, rm } from "node:fs/promises";

await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });
for (const file of ["index.html", "styles.css", "app.js", "manifest.webmanifest", "sw.js", "icon-192.png", "icon-512.png", "apple-touch-icon.png"]) {
  await cp(file, `dist/${file}`);
}
console.log("Built static site in dist/");
