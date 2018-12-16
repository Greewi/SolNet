import { Ajax } from "./ajax";
import { Lang } from "./lang";

var _listeTemplates =  [
    "pageCreationPersonnageAvatar",
    "pageCreationPersonnageCarrieres",
    "pageCreationPersonnageDescription",
    "pageCreationPersonnageEnveloppe",
    "pageCreationPersonnageEquipements",
    "pageCreationPersonnageEsprit",
    "pageCreationPersonnageEvaluation",
    "pageCreationPersonnageIdentite",
    "pageCreationPersonnageIntroduction",
    "pageCreationPersonnageIntroductionEdition",
    "pageCreationPersonnageLogiciels",
    "pageCreationPersonnageModifications",
    "pageCreationPersonnageRelations",
    "pageCreationPersonnageRoles",
    "pageCreationPersonnageTraits",
    "pagePersonnageImporter",
    "pagePersonnageListe",
    "fragmentCreationPersonnageSelecteurAjoutElement",
    "fragmentCreationPersonnageSelecteurDeuxLignes",
    "fragmentCreationPersonnageSelecteurElementSpecial",
    "fragmentCreationPersonnageSelecteurEvaluation",
    "fragmentCreationPersonnageSelecteurInput",
    "fragmentCreationPersonnageSelecteurSelect",
    "fragmentCreationPersonnageSelecteurSimple",
    "fragmentCreationPersonnageSelecteurTextArea",
    "fragmentListePersonnageSelecteurPersonnage",
];

var _templates = {};

/**
 * Gère et instancie les templates
 */
export class Templates{
    /**
     * Initialise la banque de templates
     * @returns {Promise}
     */
    static initialise(){
        var promise = Promise.resolve();
        for(let nomTemplate of _listeTemplates)
        {
            promise = promise.then(()=>{
                console.log(`Début chargement template ${nomTemplate}`);
                return Ajax.get(`./templates/${Lang.getCodeLangue()}/${nomTemplate}.html`);
            }).then((html)=>{
                let template = document.createElement("template");
                template.innerHTML = html;
                _templates[nomTemplate] = template;
                console.log(`Template ${nomTemplate} chargé`);
            });
        }
        return promise;
    }

    /**
     * 
     * @param {string} nomTemplate le nom du template à récupérer
     * @returns {HTMLTemplateElement} le template chargé
     */
    static getTemplate(nomTemplate){
        return _templates[nomTemplate];
    }

    static log(){
        console.log(_templates);
    }
}
