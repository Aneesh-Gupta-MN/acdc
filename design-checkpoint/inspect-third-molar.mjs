import { mkdir, writeFile } from "node:fs/promises";
import { readFileSync } from "node:fs";

const sourcePath = new URL("../third_molar.glb", import.meta.url);
const outputDirectory = new URL("./third-molar-source-inspection/", import.meta.url);
const source = readFileSync(sourcePath);
const jsonLength = source.readUInt32LE(12);
const json = JSON.parse(source.subarray(20, 20 + jsonLength).toString("utf8"));
const binaryOffset = 20 + jsonLength + 8;
const extensions = { "image/jpeg": "jpg", "image/png": "png" };

await mkdir(outputDirectory, { recursive: true });

for (const [index, image] of json.images.entries()) {
  const view = json.bufferViews[image.bufferView];
  const bytes = source.subarray(binaryOffset + (view.byteOffset ?? 0), binaryOffset + (view.byteOffset ?? 0) + view.byteLength);
  await writeFile(new URL(`texture-${index}.${extensions[image.mimeType]}`, outputDirectory), bytes);
}

const report = {
  asset: json.asset,
  nodes: json.nodes.map(({ name, mesh }) => ({ name, mesh })),
  meshes: json.meshes.map((mesh) => ({ name: mesh.name, primitives: mesh.primitives })),
  materials: json.materials,
  images: json.images,
  vertexColors: json.meshes.some((mesh) => mesh.primitives.some((primitive) => "COLOR_0" in primitive.attributes)),
};

await writeFile(new URL("source-report.json", outputDirectory), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
