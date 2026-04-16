import fs from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const nextDistDir = path.join(projectRoot, ".next-inertia");
const buildManifestPath = path.join(nextDistDir, "build-manifest.json");
const outputDir = path.join(projectRoot, "frontend", "dist-next");
const outputManifestPath = path.join(projectRoot, "frontend", "dist-next", "manifest.json");

function normalizeAssetPath(assetPath) {
  return assetPath.replace(/^\/+/, "");
}

function toStaticUrl(relativePath) {
  return `/static/${relativePath.replace(/\\/g, "/")}`;
}

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function readJson(jsonPath) {
  const raw = await fs.readFile(jsonPath, "utf8");
  return JSON.parse(raw);
}

function toOutputRelativePath(nextAssetPath) {
  // Next emits under `.next-inertia/static/**`; Django serves from `/static/**`.
  // Strip the leading `static/` so destination mirrors URL space.
  return normalizeAssetPath(nextAssetPath).replace(/^static\//, "");
}

async function copyAsset(nextAssetPath) {
  const normalizedAssetPath = normalizeAssetPath(nextAssetPath);
  const sourcePath = path.join(nextDistDir, normalizedAssetPath);
  const relativeOutputPath = toOutputRelativePath(normalizedAssetPath);
  const destinationPath = path.join(outputDir, relativeOutputPath);

  await ensureDir(path.dirname(destinationPath));
  await fs.copyFile(sourcePath, destinationPath);
  return relativeOutputPath;
}

async function main() {
  const buildManifest = await readJson(buildManifestPath);
  const pageEntries = buildManifest.pages ?? {};

  const entryKey =
    Object.keys(pageEntries).find((key) => key.includes("inertia_client")) ??
    (Object.prototype.hasOwnProperty.call(pageEntries, "/") ? "/" : null);

  if (!entryKey) {
    throw new Error(
      "Could not find inertia_client entry in .next-inertia/build-manifest.json"
    );
  }

  const entryAssets = pageEntries[entryKey] ?? [];
  const appAssets = pageEntries["/_app"] ?? [];
  const lowPriorityAssets = buildManifest.lowPriorityFiles ?? [];
  const rootMainAssets = buildManifest.rootMainFiles ?? [];
  const polyfillAssets = buildManifest.polyfillFiles ?? [];
  const allPageAssets = Object.values(pageEntries).flat();
  const jsAssets = Array.from(
    new Set(
      [
        ...polyfillAssets,
        ...rootMainAssets,
        ...entryAssets,
        ...appAssets,
        ...lowPriorityAssets,
      ].filter((asset) =>
        asset.endsWith(".js")
      )
    )
  );
  const cssAssets = Array.from(
    new Set(allPageAssets.filter((asset) => asset.endsWith(".css")))
  );

  if (jsAssets.length === 0) {
    throw new Error(`No JS assets found for entry "${entryKey}"`);
  }

  const copiedJs = [];
  for (const asset of jsAssets) {
    copiedJs.push(await copyAsset(asset));
  }

  const copiedCss = [];
  for (const asset of cssAssets) {
    copiedCss.push(await copyAsset(asset));
  }

  const manifest = {
    entry: "inertia_client",
    js: copiedJs.map((filePath) => toStaticUrl(filePath)),
    css: copiedCss.map((filePath) => toStaticUrl(filePath)),
  };

  await ensureDir(path.dirname(outputManifestPath));
  await fs.writeFile(outputManifestPath, JSON.stringify(manifest, null, 2));

  console.log(`Wrote ${outputManifestPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
