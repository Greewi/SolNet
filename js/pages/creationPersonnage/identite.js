import { Page } from "../page";
import { Selecteur, SelecteurInputText, SelecteurSelect } from "../selecteur";
import { Lang } from "../../lang";
import { BibliothequeDonnees } from "../../ressources/donneeSources";

export class PageIdentite extends Page{
    /**
     * @param {Ecran} ecran L'écran auquel cette page est rattachée
     * @param {Personnage} personnage Le personnage à créer
     */
    constructor(ecran , personnage){
        super("pageCreationPersonnageIdentite", ecran);
        this._personnage = personnage;

        this._elementPseudonyme = this.element.querySelector("#creationPersonnagePseudonyme");
        this._elementNomAdministratif = this.element.querySelector("#creationPersonnageNomAdministratif");
        this._elementProfession = this.element.querySelector("#creationPersonnageProfession");
        this._elementAffiliation = this.element.querySelector("#creationPersonnageAffiliation");
        this._elementGenre = this.element.querySelector("#creationPersonnageGenre");
    }

    /**
     * @override
     * @inheritdoc
     */
    ouvre(animation){
        super.ouvre(animation);
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
        var selecteur = new SelecteurSelect(Lang.get("InputProfessionActuelle"), Lang.get("DescriptionProfessionActuelle"));
        selecteur.ajouteOption("", "", this._personnage.identite.profession == "");
        for(let carriere of this._personnage.elements.carrieres)
            selecteur.ajouteOption(carriere.nom, carriere.nom, this._personnage.identite.profession == carriere.nom);
        selecteur.onchange = (valeur)=>{
            this._personnage.identite.profession = valeur;
        };
        this._elementProfession.appendChild(selecteur.element);
    }
    initialiseAffiliation(){
        this._elementAffiliation.innerHTML = "";
        var selecteur = new SelecteurSelect(Lang.get("InputAffiliationActuelle"), Lang.get("DescriptionAffiliationActuelle"));
        selecteur.ajouteOption("", "", this._personnage.identite.affiliation == "");
        for(let relation of this._personnage.elements.relations)
            selecteur.ajouteOption(relation.nom, relation.nom, this._personnage.identite.affiliation == relation.nom);
        selecteur.onchange = (valeur)=>{
            this._personnage.identite.affiliation = valeur;
        };
        this._elementAffiliation.appendChild(selecteur.element);
    }
    initialiseGenre(){
        this._elementGenre.innerHTML = "";
        let selecteur = new SelecteurSelect(Lang.get("InputGenre"), Lang.get("DescriptionGenre"));
        selecteur.ajouteOption("", "", this._personnage.identite.genre == "");
        for(let idGenre in BibliothequeDonnees.genres)
            selecteur.ajouteOption(idGenre, Lang.get(`Genre_${idGenre}`), this._personnage.identite.genre == idGenre);
        selecteur.onchange = (valeur)=>{
            this._personnage.identite.genre = valeur;
        };
        this._elementGenre.appendChild(selecteur.element);
    }

    detruit(){
        super.detruit();
    }
}