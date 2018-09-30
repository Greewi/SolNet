import { Page } from "../page";
import { Ecran } from "../../ecrans/ecran";
import { Personnage } from "../../personnages/personnage";

/**
 * Page d'introduction de la création de personnage
 */
export class PageIntroduction extends Page{
    /**
     * @param {Ecran} ecran L'écran auquel cette page est rattachée
     * @param {Personnage} personnage Le personnage à créer
     */
    constructor(ecran , personnage){
        super("creationPersonnagePageIntroduction", ecran);
        this._personnage = personnage;
        this._boutonSuivant = this.element.querySelector(".bouton-suivant");
        this._actionBoutonSuivant = (event) => {
            this.ecran.ouvre("choixRole", true);
        };
        this._boutonSuivant.addEventListener("click", this._actionBoutonSuivant);
    }

    detruit(){
        super.detruit();
        this._boutonSuivant.removeEventListener(this._actionBoutonSuivant);
    }
}