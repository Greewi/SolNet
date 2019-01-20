import { Page } from "../page";
import { Lang } from "../../lang";
import { BibliothequePersonnage } from "../../ressources/bibliothequePersonnage";
import { SelecteurPersonnage as SelecteurPersonnage } from "../selecteur";
import { EcranCreationPersonnage } from "../../ecrans/ecranCreationPersonnage";
import { Routeur } from "../../routeur";
import { EcranEditionPersonnage } from "../../ecrans/ecranEditionPersonnage";
import { EcranAffichagePersonnage } from "../../ecrans/ecranAffichagePersonnage";

export class PageListePersonnages extends Page{
    /**
     * @param {Ecran} ecran L'écran auquel cette page est rattachée
     */
    constructor(ecran){
        super("pagePersonnageListe", ecran);

        this._listePersonnages = this.element.querySelector("#personnageListePersonnages");
        this._boutonCreer = this.element.querySelector("#personnageNouveauPersonnage");
        this._boutonImporter = this.element.querySelector("#personnageImporterPersonnage");
        
        this._actionCreePersonnage = (event)=>{
            event.preventDefault();
            let personnage = BibliothequePersonnage.creePersonnage();
            this._ajoutePersonnage(personnage.id, Lang.get("NomNouveauPersonnage"));
            let ecranEdition = new EcranCreationPersonnage(personnage);
            Routeur.ouvreEcran(ecranEdition);
        };
        this._boutonCreer.addEventListener("click", this._actionCreePersonnage);

        this._actionImporter = (event)=>{
            event.preventDefault();
            ecran.ouvre("importerPersonnage", Page.AVANCER);
        };
        this._boutonImporter.addEventListener("click", this._actionImporter);
    }
    
    /**
     * @override
     * @inheritdoc
     */
    ouvre(animation){
        super.ouvre(animation);
        this._listePersonnages.innerHTML = "";

        var personnages = BibliothequePersonnage.getListePersonnages();
        for(let idPersonnage in personnages)
        {
            let nomPersonnage = personnages[idPersonnage];
            this._ajoutePersonnage(idPersonnage, nomPersonnage);
        }
    }

    /**
     * Ajoute un personnage dans la liste des personnages
     * @param {number} idPersonnage 
     * @param {string} nomPersonnage 
     */
    _ajoutePersonnage(idPersonnage, nomPersonnage){
        let selecteur = new SelecteurPersonnage(nomPersonnage);
        selecteur.onclick = ()=>{
            let personnage = BibliothequePersonnage.getPersonnage(idPersonnage);
            let ecranAffichage = new EcranAffichagePersonnage(personnage);
            Routeur.ouvreEcran(ecranAffichage);
        };
        selecteur.onedite = ()=>{
            let personnage = BibliothequePersonnage.getPersonnage(idPersonnage);
            let ecranEdition = new EcranEditionPersonnage(personnage);
            Routeur.ouvreEcran(ecranEdition);
        };
        selecteur.onsupprime = ()=>{
            if(confirm(Lang.get("ConfirmationSuppressionPersonnage", {"CharacterName":nomPersonnage})))
            {
                BibliothequePersonnage.retirePersonnage(idPersonnage);
                selecteur.element.remove();
            }
        };
        selecteur.onsauvegarde = ()=>{
            BibliothequePersonnage.exportePersonnage(idPersonnage);
        };
        this._listePersonnages.appendChild(selecteur.element);
    }

    /**
     * @override
     * @inheritdoc
     */
    detruit(){
        super.detruit();
        this._boutonCreer.removeEventListener("click", this._actionCreePersonnage);
        this._boutonImporter.removeEventListener("click", this._actionImporter);
    }
}