import { Page } from "../page";
import { Selecteur, SelecteurInputText, SelecteurSelect } from "./selecteur";
import { Lang } from "../../lang";
import { BanqueDonnees } from "../../personnages/donneeSources";

export class PageIdentite extends Page{
    /**
     * @param {Ecran} ecran L'écran auquel cette page est rattachée
     * @param {Personnage} personnage Le personnage à créer
     */
    constructor(ecran , personnage){
        super("creationPersonnagePageIdentite", ecran);
        this._personnage = personnage;

        this._elementPseudonyme = this.element.querySelector("#creationPersonnagePseudonyme");
        this._elementNomAdministratif = this.element.querySelector("#creationPersonnageNomAdministratif");
        this._elementProfession = this.element.querySelector("#creationPersonnageProfession");
        this._elementAffiliation = this.element.querySelector("#creationPersonnageAffiliation");
        this._elementGenre = this.element.querySelector("#creationPersonnageGenre");

        this._boutonPrecedent = this.element.querySelector(".bouton-precedent");
        this._actionBoutonPrecedent = (event) => {
            this.ecran.ouvre("choixCarriere", false);
        };
        this._boutonPrecedent.addEventListener("click", this._actionBoutonPrecedent);

        this._boutonSuivant = this.element.querySelector(".bouton-suivant");
        this._actionBoutonSuivant = (event) => {
        //    this.ecran.ouvre("concept", true);
        };
        this._boutonSuivant.addEventListener("click", this._actionBoutonSuivant);
    }

    /**
     * @override
     * @inheritdoc
     */
    ouvre(avancer){
        super.ouvre(avancer);

        this.initialisePseudonyme();
        this.initialiseNomAdministratif();
        this.initialiseProfession();
        this.initialiseAffiliation();
        this.initialiseGenre();
    }
    initialisePseudonyme(){
        this._elementPseudonyme.innerHTML = "";
        var selecteur = new SelecteurInputText(Lang.get("InputPseudonyme"), Lang.get("DescriptionPseudonyme"));
        selecteur.valeur = this._personnage.identite.pseudonyme;
        selecteur.onchange = (valeur)=>{
            this._personnage.identite.pseudonyme = valeur;
        };
        this._elementPseudonyme.appendChild(selecteur.element);
    }
    initialiseNomAdministratif(){
        this._elementNomAdministratif.innerHTML = "";
        var selecteur = new SelecteurInputText(Lang.get("InputNomAdministratif"), Lang.get("DescriptionNomAdministratif"));
        selecteur.valeur = this._personnage.identite.nomAdministratif;
        selecteur.onchange = (valeur)=>{
            this._personnage.identite.nomAdministratif = valeur;
        };
        this._elementNomAdministratif.appendChild(selecteur.element);
    }
    initialiseProfession(){
        this._elementProfession.innerHTML = "";
        var selecteur = new SelecteurSelect(Lang.get("DescriptionProfessionActuelle"));
        for(let carriere of this._personnage.elements.carrieres)
            selecteur.ajouteOption(carriere.nom, carriere.nom, this._personnage.identite.profession == carriere.nom);
        selecteur.onchange = (valeur)=>{
            this._personnage.identite.profession = valeur;
        };
        this._elementProfession.appendChild(selecteur.element);
    }
    initialiseAffiliation(){
        this._elementAffiliation.innerHTML = "";
        var selecteur = new SelecteurSelect(Lang.get("DescriptionAffiliationActuelle"));
        this._elementAffiliation.appendChild(selecteur.element);
    }
    initialiseGenre(){
        this._elementGenre.innerHTML = "";
        let selecteur = new SelecteurSelect(Lang.get("DescriptionGenre"));
        for(let idGenre in BanqueDonnees.genres)
            selecteur.ajouteOption(idGenre, Lang.get(`Genre_${idGenre}`), this._personnage.identite.genre == idGenre);
        selecteur.onchange = (valeur)=>{
            this._personnage.identite.genre = valeur;
        };
        this._elementGenre.appendChild(selecteur.element);
    }

    detruit(){
        super.detruit();
        this._boutonPrecedent.removeEventListener(this._actionBoutonPrecedent);
        this._boutonSuivant.removeEventListener(this._actionBoutonSuivant);
    }
}