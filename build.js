const fs = require('fs');
const config = require('./config.json');

var sourceWorker = "";
var sourceList = [];

const metAJourConfig = () => {
    config.build++;
    let chaine = "{";
    let premier = true;
    for (let cle in config) {
        chaine += `${premier?"\n":",\n"}    "${cle}" : ${JSON.stringify(config[cle])}`;
        premier = false;
    }
    chaine += "\n}";
    return ecritFichier('./config.json', chaine);
};

const litFichier = (path) => {
    return new Promise((accept, reject) => {
        fs.readFile(path, "utf8", function (err, data) {
            if (err)
                reject(err);
            else
                accept(data);
        });
    });
};

const ecritFichier = (path, data) => {
    return new Promise((accept, reject) => {
        fs.writeFile(path, data, "utf8", (err) => {
            if (err)
                reject(err);
            else
                accept(data);
        });
    });
};

const listeRepertoire = (path) => {
    return new Promise((accept, reject) => {
        fs.readdir(path, function (err, items) {
            if (err)
                return reject(err);

            let promises = [];
            for (let item of items) {
                if (fs.lstatSync(path + "/" + item).isDirectory())
                    promises.push(listeRepertoire(path + "/" + item))
                else
                    sourceList.push(`${path}/${item}`);
            }
            Promise.all(promises).then(() => {
                accept();
            });
        });
    });
};

metAJourConfig()
    .then(() => {
        return litFichier("serviceWorker-dist.js");
    })
    .then((source) => {
        sourceWorker = source;
        sourceWorker = sourceWorker.replace("<version>", `solnet-${config.version}-${config.build}`);
        sourceList.push("");
        sourceList.push("favicon.ico");
        sourceList.push("index.html");
        return Promise.all([
            listeRepertoire("css"),
            listeRepertoire("images"),
            listeRepertoire("js"),
            listeRepertoire("localisation"),
            listeRepertoire("res")
        ]);
    })
    .then(() => {
        let chaineSource = "";
        for (let source of sourceList)
            chaineSource += `"/${source}",\n`;
        sourceWorker = sourceWorker.replace(/\/\/<DebutSources[^]*\/\/FinSources>/gm, `//<DebutSources\n${chaineSource}//FinSources>`);
    })
    .then(() => {
        return ecritFichier("serviceWorker.js", sourceWorker);
    })
    .catch((e) => {
        console.error(e);
    });
