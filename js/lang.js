import { Ajax } from "./ajax";
import { Loader } from "./loader";

var _codeLangue = "";
var _fragmentLang = null;

/**
 * Gère la loclaisation de l'application
 */
export class Lang {
    /**
     * Initialise le module
     * @param {string} codeLangue le code ISO 639-1 de la langue à charger.
     */
    static initialise(codeLangue){
        _codeLangue = codeLangue;

        Loader.setNombreSousEtape(1);

        return Promise.resolve()
        .then(()=>{
            console.log(`Début chargement langue : ${codeLangue}`);
            return Ajax.get(`./localisation/${codeLangue}/fragments.json`);
        })
        .then((json)=>{
            _fragmentLang = JSON.parse(json);
            console.log(`Début langue ${codeLangue} chargée`);
            Loader.termineSousEtape();
        })
        .catch((e)=>{
            if(codeLangue!="en" && codeLangue!="fr")
                return Lang.initialise("en");
            else if(codeLangue!="fr")
                return Lang.initialise("fr");
        });
    }

    /**
     * @returns {string} codeLangue
     */
    static getCodeLangue(){
        return _codeLangue;
    }

    /**
     * Génère la chaine de caractère d'un fragment de langue
     * @param {string} idFragment L'id du fragment de langue
     * @param {Object<string, string>} [remplacements] Les remplacements de variable à effectuer (ne pas mettre les %)
     */
    static get(idFragment, remplacements){
        let fragment = _fragmentLang[idFragment];
        if(!fragment)
            return `String not found : ${idFragment}`;
        if(remplacements)
            for(var variable in remplacements)
                fragment = fragment.replace(`%${variable}%`, remplacements[variable]);
        return fragment;
    }
}