import sharp from "sharp";
import pngToIco from "png-to-ico";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";

const OUT = join(import.meta.dir, "..", "public");
const APP = join(import.meta.dir, "..", "src", "app");

const BG = "#000000";
const ACCENT = "#57d28d";
const MUTED = "#1a1a1a";
const TEXT = "#ededed";
const SUBTLE = "#555555";

function globeSvg(size: number) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.32;
  const dotR = size * 0.012;

  const dots = [
    { lat: 37.77, lng: -122.42 },
    { lat: 40.71, lng: -74.01 },
    { lat: 51.51, lng: -0.13 },
    { lat: 48.86, lng: 2.35 },
    { lat: 35.68, lng: 139.65 },
    { lat: -33.87, lng: 151.21 },
    { lat: 1.35, lng: 103.82 },
    { lat: 37.57, lng: 127.0 },
    { lat: 28.61, lng: 77.21 },
    { lat: -12.05, lng: -77.04 },
    { lat: -34.6, lng: -58.38 },
    { lat: 52.52, lng: 13.41 },
    { lat: 19.43, lng: -99.13 },
    { lat: 25.03, lng: 121.57 },
    { lat: 10.82, lng: 106.63 },
    { lat: -22.91, lng: -43.17 },
    { lat: 49.28, lng: -123.12 },
    { lat: 30.27, lng: -97.74 },
  ];

  const dotsSvg = dots
    .map(({ lat, lng }) => {
      const phi = ((90 - lat) * Math.PI) / 180;
      const theta = ((lng + 30) * Math.PI) / 180;
      const x = cx + r * Math.sin(phi) * Math.cos(theta);
      const y = cy - r * Math.cos(phi);
      const z = Math.sin(phi) * Math.sin(theta);
      if (z < -0.15) return "";
      const opacity = Math.max(0.3, Math.min(1, z + 0.5));
      return `<circle cx="${x}" cy="${y}" r="${dotR}" fill="${ACCENT}" opacity="${opacity.toFixed(2)}"/>`;
    })
    .join("\n    ");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="${BG}"/>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${MUTED}" stroke-width="${size * 0.003}"/>
  <ellipse cx="${cx}" cy="${cy}" rx="${r * 0.5}" ry="${r}" fill="none" stroke="${MUTED}" stroke-width="${size * 0.002}" opacity="0.5"/>
  <line x1="${cx - r}" y1="${cy}" x2="${cx + r}" y2="${cy}" stroke="${MUTED}" stroke-width="${size * 0.002}" opacity="0.4"/>
  <ellipse cx="${cx}" cy="${cy - r * 0.5}" rx="${r * 0.87}" ry="${r * 0.2}" fill="none" stroke="${MUTED}" stroke-width="${size * 0.002}" opacity="0.3"/>
  <ellipse cx="${cx}" cy="${cy + r * 0.5}" rx="${r * 0.87}" ry="${r * 0.2}" fill="none" stroke="${MUTED}" stroke-width="${size * 0.002}" opacity="0.3"/>
  ${dotsSvg}
</svg>`;
}

function ogSvg(width: number, height: number) {
  const globe = globeSvg(height);
  const globeX = width - height * 0.55;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <radialGradient id="glow" cx="75%" cy="50%" r="40%">
      <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.06"/>
      <stop offset="100%" stop-color="${BG}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="${BG}"/>
  <rect width="${width}" height="${height}" fill="url(#glow)"/>

  <g transform="translate(${globeX}, 0)">
    ${globe.replace(/<svg[^>]*>/, "").replace("</svg>", "").replace(`<rect width="${height}" height="${height}" fill="${BG}"/>`, "")}
  </g>

  <text x="80" y="${height * 0.38}" font-family="system-ui, -apple-system, sans-serif" font-size="52" font-weight="700" fill="${TEXT}" letter-spacing="-1">
    Codex Ambassadors
  </text>
  <text x="80" y="${height * 0.38 + 60}" font-family="system-ui, -apple-system, sans-serif" font-size="48" font-weight="700" fill="${ACCENT}" letter-spacing="-1">
    Globe
  </text>

  <text x="80" y="${height * 0.38 + 120}" font-family="ui-monospace, monospace" font-size="18" fill="${SUBTLE}">
    104 ambassadors / 22+ countries / interactive 3D map
  </text>

  <line x1="80" y1="${height * 0.38 + 145}" x2="280" y2="${height * 0.38 + 145}" stroke="${ACCENT}" stroke-width="2" opacity="0.4"/>

  <text x="80" y="${height - 50}" font-family="ui-monospace, monospace" font-size="14" fill="${SUBTLE}">
    codex-globe.vercel.app
  </text>
</svg>`;
}

function faviconSvg(size: number) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.38;
  const dotR = size * 0.04;

  const dots = [
    { lat: 37.77, lng: -122.42 },
    { lat: 51.51, lng: -0.13 },
    { lat: 35.68, lng: 139.65 },
    { lat: -33.87, lng: 151.21 },
    { lat: 1.35, lng: 103.82 },
    { lat: -12.05, lng: -77.04 },
    { lat: 28.61, lng: 77.21 },
  ];

  const dotsSvg = dots
    .map(({ lat, lng }) => {
      const phi = ((90 - lat) * Math.PI) / 180;
      const theta = ((lng + 30) * Math.PI) / 180;
      const x = cx + r * Math.sin(phi) * Math.cos(theta);
      const y = cy - r * Math.cos(phi);
      const z = Math.sin(phi) * Math.sin(theta);
      if (z < -0.1) return "";
      const opacity = Math.max(0.4, Math.min(1, z + 0.5));
      return `<circle cx="${x}" cy="${y}" r="${dotR}" fill="${ACCENT}" opacity="${opacity.toFixed(2)}"/>`;
    })
    .join("\n    ");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${size * 0.18}" fill="${BG}"/>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${MUTED}" stroke-width="${size * 0.02}"/>
  <ellipse cx="${cx}" cy="${cy}" rx="${r * 0.5}" ry="${r}" fill="none" stroke="${MUTED}" stroke-width="${size * 0.015}" opacity="0.4"/>
  <line x1="${cx - r}" y1="${cy}" x2="${cx + r}" y2="${cy}" stroke="${MUTED}" stroke-width="${size * 0.015}" opacity="0.3"/>
  ${dotsSvg}
</svg>`;
}

async function generateOg() {
  const svg = ogSvg(1200, 630);
  await sharp(Buffer.from(svg)).png().toFile(join(OUT, "og.png"));
  console.log("  og.png (1200x630)");
}

async function generateOgTwitter() {
  const svg = ogSvg(1200, 600);
  await sharp(Buffer.from(svg)).png().toFile(join(OUT, "og-twitter.png"));
  console.log("  og-twitter.png (1200x600)");
}

async function generateFavicon() {
  const sizes = [16, 32, 48];
  const pngs: Buffer[] = [];

  for (const size of sizes) {
    const svg = faviconSvg(size * 4);
    const png = await sharp(Buffer.from(svg))
      .resize(size, size)
      .png()
      .toBuffer();
    pngs.push(png);
  }

  const ico = await pngToIco(pngs);
  await writeFile(join(APP, "favicon.ico"), ico);
  console.log("  favicon.ico (16/32/48)");

  const svg192 = faviconSvg(192);
  await sharp(Buffer.from(svg192)).png().toFile(join(OUT, "icon-192.png"));
  console.log("  icon-192.png");

  const svg512 = faviconSvg(512);
  await sharp(Buffer.from(svg512)).png().toFile(join(OUT, "icon-512.png"));
  console.log("  icon-512.png");

  const appleSvg = faviconSvg(180);
  await sharp(Buffer.from(appleSvg)).png().toFile(join(OUT, "apple-touch-icon.png"));
  console.log("  apple-touch-icon.png");
}

console.log("Generating brand assets...");
await Promise.all([generateOg(), generateOgTwitter(), generateFavicon()]);
console.log("Done.");
