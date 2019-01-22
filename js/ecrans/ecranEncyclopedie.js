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
            Routeur.ouvreEcran(new EcranAccueil());
        });
        BibliothequeThemes.setTheme("terre");
    }
}