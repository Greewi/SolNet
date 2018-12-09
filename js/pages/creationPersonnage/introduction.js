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
    constructor(ecran , personnage, pagePrecedent, pageSuivante){
        super("creationPersonnagePageIntroduction", ecran, pagePrecedent, pageSuivante);
        this._personnage = personnage;
    }

    detruit(){
        super.detruit();
    }
}