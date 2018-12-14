import { Page } from "../page";
import { Lang } from "../../lang";
import { Personnage } from "../../personnages/personnage";
import { BibliothequePersonnage } from "../../bibliothequePersonnage";
import { SelecteurElementEditable } from "../selecteur";
import { EcranCreationPersonnage } from "../../ecrans/ecranCreationPersonnage";
import { Routeur } from "../../routeur";

export class PageListePersonnages extends Page{
    /**
     * @param {Ecran} ecran L'écran auquel cette page est rattachée
     */
    constructor(ecran , pagePrecedent, pageSuivante){
        super("pagePersonnageListe", ecran, pagePrecedent, pageSuivante);

        this._listePersonnages = this.element.querySelector("#personnageListePersonnages");
        this._boutonCreer = this.element.querySelector("#personnageNouveauPersonnage");
        
        this._actionCreePersonnage = ()=>{
            console.log("Nouveau personnage");
            event.preventDefault();
            let personnage = BibliothequePersonnage.creePersonnage();
            this._ajoutePersonnage(personnage.id, Lang.get("NomNouveauPersonnage"));
        };
        this._boutonCreer.addEventListener("click", this._actionCreePersonnage);
    }
    
    /**
     * @override
     * @inheritdoc
     */
    ouvre(avancer){
        super.ouvre(avancer);
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
        let selecteur = new SelecteurElementEditable(nomPersonnage);
        selecteur.onclick = ()=>{
            let personnage = BibliothequePersonnage.getPersonnage(idPersonnage);
            //Todo
        };
        selecteur.onedite = ()=>{
            let personnage = BibliothequePersonnage.getPersonnage(idPersonnage);
            let ecranEdition = new EcranCreationPersonnage(personnage);
            Routeur.ouvreEcran(ecranEdition);
        };
        selecteur.onsupprime = ()=>{
            if(confirm(`Voulez vous vraiment supprimer le personnage ${nomPersonnage} ?`))
            {
                BibliothequePersonnage.retirePersonnage(idPersonnage);
                selecteur.element.remove();
            }
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
    }
}