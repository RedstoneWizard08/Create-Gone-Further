const fs = require("fs");
const path = require("path");
const toml = require("toml");

const mods = path.join(__dirname, "mods");
const _modsList = fs.readdirSync(mods);
const modsList = _modsList.filter((f) => f.endsWith(".toml"));

let md = `
### Mod List

<details>
<summary>Expand</summary>

`;

modsList.forEach((f) => {
  const file = path.join(mods, f);
  const data = toml.parse(fs.readFileSync(file, "utf8"));

  md += `- ${data.name}\n`;
});

md += `\n</details>`;

fs.writeFileSync(path.join(__dirname, "VERSION.md"), md);
