import { Page } from "./page";
import { Ecran } from "../ecrans/ecran";
import { EcranEncyclopedie } from "../ecrans/ecranEncyclopedie";
import { Routeur } from "../routeur";
import { EcranGestionPersonnage } from "../ecrans/ecranGestionPersonnage";

/**
 * Page d'accueil de l'application
 */
export class PageAccueil extends Page{
    /**
     * @param {Ecran} ecran L'écran auquel cette page est rattachée
     */
    constructor(ecran){
        super("pageAccueil", ecran);

        let boutonEncyclopedie = this.element.querySelector("#accueilEncyclopedie");
        boutonEncyclopedie.onclick = ()=>{
            Routeur.ouvreEcran(new EcranEncyclopedie())
        };

        let boutonPersonnages = this.element.querySelector("#accueilPersonnages");
        boutonPersonnages.onclick = ()=>{
            Routeur.ouvreEcran(new EcranGestionPersonnage());
        };
    }
}