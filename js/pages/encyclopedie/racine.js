import { Page } from "../page";
import { Ecran } from "../../ecrans/ecran";

/**
 * Page racine de l'encyclopédie
 */
export class PageRacine extends Page{
    /**
     * @param {Ecran} ecran L'écran auquel cette page est rattachée
     */
    constructor(ecran){
        super("racine", ecran);
    }
}