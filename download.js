const cp = require("child_process");
const json = require("./mods.json");

json.forEach((mod, i, a) => {
  console.log(
    `[${i + 1} / ${a.length}] Downloading mod ${mod.id} (file ${mod.file})...`
  );
  cp.execSync(`packwiz cf add --addon-id ${mod.id} --file-id ${mod.file}`, {
    stdio: "inherit",
  });
});
