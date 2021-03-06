import { Ecran } from "./ecran";
import { PageAccueil } from "../pages/pageAccueil";
import { BibliothequeThemes } from "../ressources/themes";

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

    /**
     * @override
     * @inheritdoc
     */
    ouvre(page, animation){
        BibliothequeThemes.setTheme("sol");
        super.ouvre(page, animation);
    }
}