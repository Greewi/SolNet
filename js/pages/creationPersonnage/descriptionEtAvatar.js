import { Page } from "../page";
import { SelecteurTextArea } from "../selecteur";
import { Lang } from "../../lang";
import { Description } from "../../personnages/description";

class PageDescriptionGenerique extends Page{
    /**
     * @param {Ecran} ecran L'écran auquel cette page est rattachée
     * @param {string} idPage L'id de la page
     * @param {Description} description La description à remplir
     * @param {Personnage} personnage Le personnage à créer
     * @param {string} idBoutonCopier l'id du bouton copier la description
     * @param {Description} descriptionSource La description pouvant servir de source
     */
    constructor(ecran, pageDOM, description, personnage, idBoutonCopier, descriptionSource){
        super(pageDOM, ecran);
        this._personnage = personnage;
        this._description = description;
        this._descriptionSource = descriptionSource;
        this._boutonCopierDescription = this.element.querySelector(`#${idBoutonCopier}`);
        this._actionCopierDescription = ()=>{
            if(confirm(Lang.get("ConfirmationCopierDescription")))
            {
                this._selecteurPremiereImpression.valeur = descriptionSource.premiereImpression;
                description.premiereImpression = descriptionSource.premiereImpression;
                this._selecteurCorps.valeur = descriptionSource.corps;
                description.corps = descriptionSource.corps;
                this._selecteurVisage.valeur = descriptionSource.visage;
                description.visage = descriptionSource.visage;
            }
        };
        this._boutonCopierDescription.addEventListener("click", this._actionCopierDescription);
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
        this._selecteurPremiereImpression = new SelecteurTextArea(Lang.get("InputDescriptionPremiereImpression"), 4);
        this._selecteurPremiereImpression.valeur = this._description.premiereImpression;
        this._selecteurPremiereImpression.onchange = (valeur)=>{
            this._description.premiereImpression = valeur;
        };
        this._elementPremiereImpression.appendChild(this._selecteurPremiereImpression.element);
    }

    initialiseCorps(){
        this._elementCorps.innerHTML = "";
        this._selecteurCorps = new SelecteurTextArea(Lang.get("InputDescriptionCorps"), 4);
        this._selecteurCorps.valeur = this._description.corps;
        this._selecteurCorps.onchange = (valeur)=>{
            this._description.corps = valeur;
        };
        this._elementCorps.appendChild(this._selecteurCorps.element);
    }

    initialiseVisage(){
        this._elementVisage.innerHTML = "";
        this._selecteurVisage = new SelecteurTextArea(Lang.get("InputDescriptionVisage"), 4);
        this._selecteurVisage.valeur = this._description.visage;
        this._selecteurVisage.onchange = (valeur)=>{
            this._description.visage = valeur;
        };
        this._elementVisage.appendChild(this._selecteurVisage.element);
    }

    detruit(){
        super.detruit();
        this._boutonCopierDescription.removeEventListener("click", this._actionCopierDescription);
    }
}

export class PageDescriptionPhysique extends PageDescriptionGenerique{
     /**
     * @param {Ecran} ecran L'écran auquel cette page est rattachée
     * @param {Personnage} personnage Le personnage à créer
     */
    constructor(ecran, personnage){
        super(ecran, "pageCreationPersonnageDescription", personnage.description, personnage, "creationPersonnageCopierAvatar", personnage.avatar);
        this.setElements("creationPersonnageDescriptionPremiereImpression", "creationPersonnageDescriptionCorps", "creationPersonnageDescriptionVisage");
    }
}

export class PageDescriptionAvatar extends PageDescriptionGenerique{
    /**
    * @param {Ecran} ecran L'écran auquel cette page est rattachée
    * @param {Personnage} personnage Le personnage à créer
    */
   constructor(ecran, personnage){
       super(ecran, "pageCreationPersonnageAvatar", personnage.avatar, personnage, "creationPersonnageCopierDescription", personnage.description);
       this.setElements("creationPersonnageAvatarPremiereImpression", "creationPersonnageAvatarCorps", "creationPersonnageAvatarVisage");
   }
}