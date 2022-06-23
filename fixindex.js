const toml = require("toml");
const toml2 = require("@iarna/toml");
const fs = require("fs");
const path = require("path");

const index = path.join(__dirname, "index.toml");

/**
 * @type {{ files: { file: string, hash: string, metafile?: boolean }[] }}
 */
const indexData = toml.parse(fs.readFileSync(index, "utf8"));

indexData.files.forEach((f, i, a) => {
  console.log(`[${i + 1} / ${a.length}] Fixing file ${f.file}...`);
  if (f.file.startsWith("mods/") && f.file.endsWith(".toml")) {
    const newFile = f;
    newFile.metafile = true;
    indexData.files[i] = newFile;
  }
});

const data = toml2.stringify(indexData);
fs.writeFileSync(index, data);
