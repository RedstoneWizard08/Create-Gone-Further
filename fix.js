const AdmZip = require("adm-zip-jmcnet");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const tmp = path.join(__dirname, "tmp");
const copy = path.join(__dirname, "mods_copy");
const zip = path.join(__dirname, "pack.mrpack");

const asyncForEach = async (arr, cb) => {
    for (let i = 0; i < arr.length; i++) {
        await cb(arr[i], i, arr);
    }
};

const main = async () => {
    console.log("Preparing...");

    if (fs.existsSync(tmp)) {
        fs.rmSync(tmp, { recursive: true });
    }

    fs.mkdirSync(tmp);

    if (fs.existsSync(copy)) {
        fs.rmSync(copy, { recursive: true });
    }

    fs.mkdirSync(copy);

    console.log("Extracting...");

    const zipFile = new AdmZip(zip);
    await zipFile.extractAllTo(tmp, true);

    console.log("Getting info...");

    const indexFile = path.join(tmp, "modrinth.index.json");
    const modsDir = path.join(tmp, "overrides", "mods");

    const index = JSON.parse(fs.readFileSync(indexFile));

    const mods = fs
        .readdirSync(modsDir)
        .filter((file) => file.endsWith(".jar"));

    console.log("Patching...");

    index.files = [];

    await asyncForEach(mods, async (mod, i, a) => {
        console.log(`[${i + 1} / ${a.length}] Patching ${mod}...`);

        const filePath = path.join(modsDir, mod);
        const buf = fs.readFileSync(filePath);

        const size = fs.statSync(filePath).size;

        const hashSum1 = crypto.createHash("sha1");
        const hashSum512 = crypto.createHash("sha512");

        hashSum1.update(buf);
        hashSum512.update(buf);

        const hash1 = hashSum1.digest("hex");
        const hash512 = hashSum512.digest("hex");

        fs.renameSync(filePath, path.join(copy, mod));

        const obj = {
            path: "mods/" + mod,
            hashes: {
                sha1: hash1,
                sha512: hash512,
            },
            env: {
                client: "required",
                server: "required",
            },
            downloads: [
                "https://raw.githubusercontent.com/RedstoneWizard08/Create-Gone-Further/main/mods_copy/" +
                    mod,
            ],
            fileSize: size,
        };

        index.files.push(obj);
    });

    console.log("Writing index...");

    fs.rmSync(modsDir, { recursive: true });

    fs.writeFileSync(indexFile, JSON.stringify(index, null, 4));

    console.log("Zipping...");

    const zipFile2 = new AdmZip();
    zipFile2.addLocalFolder(tmp);
    await zipFile2.writeZip(zip);
};

main();
