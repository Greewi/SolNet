import { Ajax } from "../ajax";
import { Lang } from "../lang";
import { Loader } from "../loader";

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
    "pageCreationPersonnageFin",    
    "pageCreationPersonnageHistorique",    
    "pageCreationPersonnageIdentite",
    "pageCreationPersonnageIntroduction",
    "pageCreationPersonnageIntroductionEdition",
    "pageCreationPersonnageLogiciels",
    "pageCreationPersonnageModifications",
    "pageCreationPersonnageMotivation",
    "pageCreationPersonnageNaissance",
    "pageCreationPersonnageOpinions",
    "pageCreationPersonnageRelations",
    "pageCreationPersonnageRoles",
    "pageCreationPersonnageTraits",
    "pagePersonnageImporter",
    "pagePersonnageListe",
    "pagePersonnageAfficher",
    "pagePersonnageAfficherRoll20",
    "fragmentCreationPersonnageSelecteurAjoutElement",
    "fragmentCreationPersonnageSelecteurDeuxLignes",
    "fragmentCreationPersonnageSelecteurDate",
    "fragmentCreationPersonnageSelecteurElementSpecial",
    "fragmentCreationPersonnageSelecteurEvaluation",
    "fragmentCreationPersonnageSelecteurInput",
    "fragmentCreationPersonnageSelecteurOpinion",
    "fragmentCreationPersonnageSelecteurPeriodeHistorique",
    "fragmentCreationPersonnageSelecteurSansDescription",
    "fragmentCreationPersonnageSelecteurSelect",
    "fragmentCreationPersonnageSelecteurSimple",
    "fragmentCreationPersonnageSelecteurTextArea",
    "fragmentListePersonnageSelecteurPersonnage",
    "popupConfirmation",
    "popupSelection",
    "notificationInstallation",
    "notificationMiseAJour",
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
        Loader.setNombreSousEtape(_listeTemplates.length);

        this._templates = {};
        let promises = [];
        for(let idTemplate of _listeTemplates)
            promises.push(this._chargeTemplate(idTemplate));
        Loader.setNombreSousEtape(_listeTemplates.length);
        return Promise.all(promises);
    }

    /**
     * 
     * @param {string} idTemplate le nom du template à récupérer
     * @returns {HTMLTemplateElement} le template chargé
     */
    static getTemplate(idTemplate){
        return this._templates[idTemplate];
    }

    /**
     * Charge un template dans la banque de templates
     * @param {string} idTemplate L'id du template 
     */
    static _chargeTemplate(idTemplate){
        return Promise.resolve()
        .then(()=>{
            return Ajax.get(`./localisation/${Lang.getCodeLangue()}/templates/${idTemplate}.html`);
        }).then((html)=>{
            let template = document.createElement("template");
            template.innerHTML = html;
            this._templates[idTemplate] = template;
            console.log(`Template ${idTemplate} chargé`);
            Loader.termineSousEtape();
        });
    }
}
