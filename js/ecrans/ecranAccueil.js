import { Ecran } from "./ecran";
import { PageAccueil } from "../pages/pageAccueil";

/**
 * Écran représentant l'écran d'accueil de l'application
 */
export class EcranAccueil extends Ecran{
    /**
     * Constructeur
     */
    constructor(){
        super();
        super.setPages({
            accueil : new PageAccueil(this)
        });
        super.setPageParDefaut("accueil");
    }
}