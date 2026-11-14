import fs from 'node:fs';

const source = fs.readFileSync(new URL('../third_molar.glb', import.meta.url));
const jsonLength = source.readUInt32LE(12);
const json = JSON.parse(source.subarray(20, 20 + jsonLength).toString('utf8'));
const binOffset = 20 + jsonLength + 8;
const bin = source.subarray(binOffset);

const view = (index) => json.bufferViews[index];
const accessor = (index) => json.accessors[index];
const readAccessor = (index) => {
  const a = accessor(index);
  const v = view(a.bufferView);
  const offset = (v.byteOffset || 0) + (a.byteOffset || 0);
  const count = a.count;
  const components = a.type === 'VEC3' ? 3 : 1;
  const values = [];
  for (let i = 0; i < count; i += 1) {
    const row = [];
    for (let j = 0; j < components; j += 1) row.push(bin.readFloatLE(offset + (i * components + j) * 4));
    values.push(row);
  }
  return values;
};

const primitive = json.meshes[0].primitives[0].attributes;
const positions = readAccessor(primitive.POSITION);
const normals = readAccessor(primitive.NORMAL);
const indices = (() => {
  const a = accessor(json.meshes[0].primitives[0].indices);
  const v = view(a.bufferView);
  const offset = (v.byteOffset || 0) + (a.byteOffset || 0);
  const out = [];
  for (let i = 0; i < a.count; i += 1) out.push(bin.readUInt32LE(offset + i * 4));
  return out;
})();

const width = 900;
const height = 900;
const scale = 310;
const project = ([x, y, z]) => [width / 2 + x * scale, height / 2 - y * scale, z];
const light = [0.4, 0.8, 0.7];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const normalise = (v) => { const l = Math.hypot(...v) || 1; return v.map((x) => x / l); };
const shade = (n) => {
  const value = Math.max(0, Math.min(1, 0.36 + dot(normalise(n), light) * 0.55));
  const r = Math.round(223 + 28 * value).toString(16).padStart(2, '0');
  const g = Math.round(215 + 32 * value).toString(16).padStart(2, '0');
  const b = Math.round(195 + 45 * value).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
};

const triangles = [];
for (let i = 0; i < indices.length; i += 3) {
  const ids = indices.slice(i, i + 3);
  const points = ids.map((id) => project(positions[id]));
  const n = ids.map((id) => normals[id]).reduce((sum, value) => sum.map((item, j) => item + value[j]), [0, 0, 0]);
  triangles.push({ points, z: points.reduce((sum, point) => sum + point[2], 0) / 3, fill: shade(n) });
}
triangles.sort((a, b) => a.z - b.z);

const polygons = triangles.map(({ points, fill }) => `<polygon points="${points.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ')}" fill="${fill}"/>`).join('');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="900" height="900" fill="#581D2B"/><circle cx="680" cy="220" r="170" fill="#411922" opacity=".9"/>${polygons}<text x="54" y="74" fill="#F2E8D8" font-family="Arial,sans-serif" font-size="12" font-weight="600" letter-spacing="3">THIRD MOLAR • SOURCE GEOMETRY RENDER</text><text x="54" y="838" fill="#FAF7F1" font-family="Georgia,serif" font-size="34">Care in every detail.</text></svg>`;
fs.writeFileSync(new URL('tooth-render.svg', import.meta.url), svg);
