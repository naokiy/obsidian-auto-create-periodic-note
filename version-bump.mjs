import { readFileSync, writeFileSync } from "fs";

const targetVersion = process.argv[2];
const isBeta = (process.argv.length > 2 && process.argv[3] === "beta");

const targetJson = isBeta ? "manifest-beta.json": "manifest.json";

// read minAppVersion from manifest.json and bump version to target version
let manifest = JSON.parse(readFileSync(targetJson, "utf8"));
const { minAppVersion } = manifest;
manifest.version = targetVersion;
writeFileSync(targetJson, JSON.stringify(manifest, null, 2) + "\n");

if (!isBeta) {
    // update versions.json with target version and minAppVersion from manifest.json
    let versions = JSON.parse(readFileSync("versions.json", "utf8"));
    versions[targetVersion] = minAppVersion;
    writeFileSync("versions.json", JSON.stringify(versions, null, 2) + "\n");
}