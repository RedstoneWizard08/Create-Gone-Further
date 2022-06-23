const fs = require("fs");
const path = require("path");
const json = require("./config.json");

if (!fs.existsSync(path.join(__dirname, "mods")))
  fs.mkdirSync(path.join(__dirname, "mods"));
else {
  fs.rmSync(path.join(__dirname, "mods"), { recursive: true });
  fs.mkdirSync(path.join(__dirname, "mods"));
}

json.mods.forEach((mod, i, a) => {
  console.log(
    `\n-----------------------------------------------------\n[${i + 1} / ${
      a.length
    }] Downloading mod ${
      mod.name
    }...\n-----------------------------------------------------\n`
  );

  const toml = `name = "${mod.name}"
filename = "${mod.fileName}"
side = "both"

[download]
url = "${mod.downloadUrl}"
hash-format = "sha1"
hash = "${mod.hashes.find((v) => v.algo == 1).value}"`;

  const fileName = `${mod.name
    .toLowerCase()
    .trim()
    .replace(/[^A-Za-z\s]+/gm, " ")
    .replace(/\s+/gm, " ")
    .trim()
    .replace(/\s/gm, "_")}.toml`;
  const filePath = path.join(__dirname, "mods", fileName);
  fs.writeFileSync(filePath, toml);
});
