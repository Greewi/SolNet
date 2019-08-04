import { Ecran } from "./ecran";
import { PageRacine } from "../pages/encyclopedie/racine";
import { Routeur } from "../routeur";
import { EcranAccueil } from "./ecranAccueil";
import { BibliothequeThemes } from "../ressources/themes";

/**
 * Écran représentant la racine de l'encyclopédie
 */
export class EcranEncyclopedie extends Ecran{
    /**
     * Constructeur
     */
    constructor(){
        super();
        super.setPages({
            sommaire : new PageRacine(this)
        });
        super.setPageParDefaut("sommaire");
        super.setActionRetour(()=>{
            Routeur.depileEcran(this);
        });
    }
    /**
     * @override
     * @inheritdoc
     */
    ouvre(page, animation){
        BibliothequeThemes.setTheme("terre");
        super.ouvre(page, animation);
    }
}