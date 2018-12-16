import { Ajax } from "../ajax";
import { Lang } from "../lang";

var _listeTemplates =  [
    "pageAccueil",
    "pageEncyclopedieRacine",
    "pageEncyclopedieSection",
    "pageEncyclopedieArticle",
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

/**
 * Gère et instancie les templates
 */
export class BibliothequeTemplates{
    /**
     * Initialise la banque de templates
     * @returns {Promise}
     */
    static initialise(){
        this._templates = {};

        var promise = Promise.resolve();
        for(let nomTemplate of _listeTemplates)
        {
            promise = promise.then(()=>{
                console.log(`Début chargement template ${nomTemplate}`);
                return Ajax.get(`./localisation/${Lang.getCodeLangue()}/templates/${nomTemplate}.html`);
            }).then((html)=>{
                let template = document.createElement("template");
                template.innerHTML = html;
                this._templates[nomTemplate] = template;
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
        return this._templates[nomTemplate];
    }

    static log(){
        console.log(this._templates);
    }
}
