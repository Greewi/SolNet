import { Page } from "../page";
import { Ecran } from "../../ecrans/ecran";

/**
 * Page sommaire d'une section de l'encyclopédie
 */
export class PageSommaire extends Page{
    /**
     * @param {Ecran} ecran L'écran auquel cette page est rattachée
     */
    constructor(ecran, section){
        this._nom = section.nom;
        super(`sommaire_${this._nom}`, ecran);
    }
}