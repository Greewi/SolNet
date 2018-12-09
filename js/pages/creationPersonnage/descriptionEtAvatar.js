import { Page } from "../page";
import { SelecteurTextArea } from "./selecteur";
import { Lang } from "../../lang";
import { Description } from "../../personnages/description";

class PageDescriptionGenerique extends Page{
    /**
     * @param {Ecran} ecran L'écran auquel cette page est rattachée
     * @param {string} idPage L'id de la page
     * @param {Description} description La description à remplir
     * @param {Personnage} personnage Le personnage à créer
     */
    constructor(ecran, pageDOM, description, personnage, pagePrecedent, pageSuivante){
        super(pageDOM, ecran, pagePrecedent, pageSuivante);
        this._personnage = personnage;
        this._description = description;
    }

    /**
     * Définis les zones interactives de la page
     * @param {HTMLElement} elementPremierImpression 
     * @param {HTMLElement} elementCorps 
     * @param {HTMLElement} elementVisage 
     */
    setElements(elementPremierImpression, elementCorps, elementVisage){
        this._elementPremiereImpression = this.element.querySelector("#"+elementPremierImpression);
        this._elementCorps = this.element.querySelector("#"+elementCorps);
        this._elementVisage = this.element.querySelector("#"+elementVisage);
    }

    /**
     * @override
     * @inheritdoc
     */
    ouvre(avancer){
        super.ouvre(avancer);
        this.initialisePremiereImpression();
        this.initialiseCorps();
        this.initialiseVisage();
    }

    initialisePremiereImpression(){
        this._elementPremiereImpression.innerHTML = "";
        var selecteur = new SelecteurTextArea(Lang.get("InputDescriptionPremiereImpression"), 4);
        selecteur.valeur = this._description.premiereImpression;
        selecteur.onchange = (valeur)=>{
            this._description.premiereImpression = valeur;
        };
        this._elementPremiereImpression.appendChild(selecteur.element);
    }

    initialiseCorps(){
        this._elementCorps.innerHTML = "";
        var selecteur = new SelecteurTextArea(Lang.get("InputDescriptionCorps"), 4);
        selecteur.valeur = this._description.corps;
        selecteur.onchange = (valeur)=>{
            this._description.corps = valeur;
        };
        this._elementCorps.appendChild(selecteur.element);
    }

    initialiseVisage(){
        this._elementVisage.innerHTML = "";
        var selecteur = new SelecteurTextArea(Lang.get("InputDescriptionVisage"), 4);
        selecteur.valeur = this._description.visage;
        selecteur.onchange = (valeur)=>{
            this._description.visage = valeur;
        };
        this._elementVisage.appendChild(selecteur.element);
    }

    detruit(){
        super.detruit();
    }
}

export class PageDescriptionPhysique extends PageDescriptionGenerique{
     /**
     * @param {Ecran} ecran L'écran auquel cette page est rattachée
     * @param {Personnage} personnage Le personnage à créer
     */
    constructor(ecran, personnage, pagePrecedent, pageSuivante){
        super(ecran, "pageCreationPersonnageDescription", personnage.description, personnage, pagePrecedent, pageSuivante);
        this.setElements("creationPersonnageDescriptionPremiereImpression", "creationPersonnageDescriptionCorps", "creationPersonnageDescriptionVisage");
    }
}

export class PageDescriptionAvatar extends PageDescriptionGenerique{
    /**
    * @param {Ecran} ecran L'écran auquel cette page est rattachée
    * @param {Personnage} personnage Le personnage à créer
    */
   constructor(ecran, personnage, pagePrecedent, pageSuivante){
       super(ecran, "pageCreationPersonnageAvatar", personnage.avatar, personnage, pagePrecedent, pageSuivante);
       this.setElements("creationPersonnageAvatarPremiereImpression", "creationPersonnageAvatarCorps", "creationPersonnageAvatarVisage");
   }
}