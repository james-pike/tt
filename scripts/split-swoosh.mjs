import { readFileSync, writeFileSync } from "fs";

const SRC = "public/64950e077f4c3f6922b7caf512a2c336.svg";
const raw = readFileSync(SRC, "utf8");
const METHOD = process.argv[2] || "diag"; // "y" | "diag" | "adiag"

const pathRe = /<path\s+d="([^"]*)"\s+fill="(#[0-9A-Fa-f]{6})"\s+transform="translate\(([^,]+),([^)]+)\)"\s*\/>/g;

const pieces = [];
let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
let m;
while ((m = pathRe.exec(raw)) !== null) {
  const [, d, , txRaw, tyRaw] = m;
  const tx = parseFloat(txRaw), ty = parseFloat(tyRaw);
  const nums = d.match(/-?\d*\.?\d+/g) || [];
  let sx = 0, sy = 0, n = 0, pMinX = Infinity, pMaxX = -Infinity, pMinY = Infinity, pMaxY = -Infinity;
  for (let i = 0; i + 1 < nums.length; i += 2) {
    const x = parseFloat(nums[i]) + tx;
    const y = parseFloat(nums[i + 1]) + ty;
    sx += x; sy += y; n++;
    if (x < minX) minX = x; if (x > maxX) maxX = x;
    if (y < minY) minY = y; if (y > maxY) maxY = y;
    if (x < pMinX) pMinX = x; if (x > pMaxX) pMaxX = x;
    if (y < pMinY) pMinY = y; if (y > pMaxY) pMaxY = y;
  }
  pieces.push({ d, tx, ty, cx: sx / n, cy: sy / n });
}

const cX = (minX + maxX) / 2, cY = (minY + maxY) / 2;
// upper stroke = orange (enters from left), lower stroke = yellow (enters from right)
const upper = [], lower = [];
for (const p of pieces) {
  const dx = p.cx - cX, dy = p.cy - cY;
  const isUpper = (dx - dy) >= 0; // main-diagonal split; >=0 = upper swoosh
  (isUpper ? upper : lower).push(`<path d="${p.d}" transform="translate(${p.tx},${p.ty})"/>`);
}

const pad = 8;
const vbX = Math.floor(minX - pad), vbY = Math.floor(minY - pad);
const vbW = Math.ceil(maxX - minX + pad * 2), vbH = Math.ceil(maxY - minY + pad * 2);

const brand = process.argv[3] === "brand";
const cOrange = brand ? "#F5850B" : "#e11d1d";
const cYellow = brand ? "#FFC20A" : "#1d5fe1";

const out = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vbX} ${vbY} ${vbW} ${vbH}">
<g id="swoosh-orange" fill="${cOrange}">${upper.join("")}</g>
<g id="swoosh-yellow" fill="${cYellow}">${lower.join("")}</g>
</svg>`;

writeFileSync("scripts/_swoosh-split.svg", out);
console.log(JSON.stringify({ method: METHOD, A: A.length, B: B.length, center: [Math.round(cX), Math.round(cY)], viewBox: `${vbX} ${vbY} ${vbW} ${vbH}` }));
