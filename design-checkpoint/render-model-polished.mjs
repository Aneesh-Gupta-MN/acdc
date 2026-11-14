import fs from 'node:fs';

const source = fs.readFileSync(new URL('../third_molar.glb', import.meta.url));
const jsonLength = source.readUInt32LE(12);
const json = JSON.parse(source.subarray(20, 20 + jsonLength).toString('utf8'));
const bin = source.subarray(20 + jsonLength + 8);
const view = (index) => json.bufferViews[index];
const accessor = (index) => json.accessors[index];
const readVec3 = (index) => {
  const a = accessor(index); const v = view(a.bufferView); const offset = (v.byteOffset || 0) + (a.byteOffset || 0);
  return Array.from({ length: a.count }, (_, i) => Array.from({ length: 3 }, (_, j) => bin.readFloatLE(offset + (i * 3 + j) * 4)));
};
const primitive = json.meshes[0].primitives[0];
const positions = readVec3(primitive.attributes.POSITION);
const indexAccessor = accessor(primitive.indices); const indexView = view(indexAccessor.bufferView);
const indexOffset = (indexView.byteOffset || 0) + (indexAccessor.byteOffset || 0);
const indices = Array.from({ length: indexAccessor.count }, (_, i) => bin.readUInt32LE(indexOffset + i * 4));

const width = 900; const height = 900; const scale = 310;
const rotateY = (point, angle) => {
  const c = Math.cos(angle); const s = Math.sin(angle);
  return [point[0] * c + point[2] * s, point[1], -point[0] * s + point[2] * c];
};
const project = (point) => {
  const [x, y, z] = point;
  const perspective = 1 + z * 0.08;
  return [width / 2 + (x * scale) / perspective, height / 2 - (y * scale) / perspective, z];
};

function render(angle, label, filename) {
  const triangles = [];
  for (let i = 0; i < indices.length; i += 3) {
    const points = indices.slice(i, i + 3).map((id) => project(rotateY(positions[id], angle)));
    const cx = points.reduce((sum, point) => sum + point[0], 0) / 3;
    const cy = points.reduce((sum, point) => sum + point[1], 0) / 3;
    const highlight = Math.exp(-(((cx - 430) ** 2) / (2 * 150 ** 2) + ((cy - 270) ** 2) / (2 * 240 ** 2)));
    const shadow = Math.max(0, (cx - 450) / 340);
    const warm = Math.max(0, 1 - Math.abs(cx - 450) / 420);
    const r = Math.round(208 + 42 * highlight - 30 * shadow + 8 * warm);
    const g = Math.round(197 + 46 * highlight - 36 * shadow + 8 * warm);
    const b = Math.round(177 + 50 * highlight - 32 * shadow + 10 * warm);
    triangles.push({ points, z: points.reduce((sum, point) => sum + point[2], 0) / 3, fill: `rgb(${r},${g},${b})` });
  }
  triangles.sort((a, b) => a.z - b.z);
  const polys = triangles.map(({ points, fill }) => `<polygon fill="${fill}" points="${points.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ')}"/>`).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#581D2B"/><stop offset="1" stop-color="#411922"/></linearGradient>
    <linearGradient id="enamel" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#cbbca6"/><stop offset=".22" stop-color="#f7f0e3"/><stop offset=".52" stop-color="#fffaf0"/><stop offset=".8" stop-color="#eee2d1"/><stop offset="1" stop-color="#a88f7d"/></linearGradient>
    <radialGradient id="softHighlight" cx="42%" cy="26%" r="52%"><stop stop-color="#fffdf8" stop-opacity=".9"/><stop offset=".42" stop-color="#fff7ea" stop-opacity=".25"/><stop offset="1" stop-color="#fff7ea" stop-opacity="0"/></radialGradient>
    <linearGradient id="warmRim" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#f3d7a7" stop-opacity=".25"/><stop offset=".7" stop-color="#c4a36a" stop-opacity=".46"/><stop offset="1" stop-color="#581d2b" stop-opacity="0"/></linearGradient>
  </defs>
  <rect width="900" height="900" fill="url(#bg)"/>
  <circle cx="690" cy="220" r="180" fill="#2f111b" opacity=".62"/>
  ${polys}
  <ellipse cx="405" cy="246" rx="124" ry="190" fill="#fffdf8" opacity=".16"/>
  <ellipse cx="585" cy="560" rx="72" ry="220" fill="#7a3e43" opacity=".08"/>
  <text x="54" y="74" fill="#f2e8d8" font-family="Arial,sans-serif" font-size="12" font-weight="600" letter-spacing="3">${label}</text>
  <text x="54" y="838" fill="#faf7f1" font-family="Georgia,serif" font-size="34">Care in every detail.</text>
  </svg>`;
  fs.writeFileSync(new URL(filename, import.meta.url), svg);
}

render(0, 'ACTUAL GLB RENDER • INITIAL POSE', 'tooth-render-polished-initial.svg');
render(-0.32, 'ACTUAL GLB RENDER • ROTATED POSE', 'tooth-render-polished-rotated.svg');
