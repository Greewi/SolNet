import { Page } from "./page";
import { Ecran } from "../ecrans/ecran";
import { EcranEncyclopedie } from "../ecrans/ecranEncyclopedie";
import { Routeur } from "../routeur";
import { EcranGestionPersonnage } from "../ecrans/ecranGestionPersonnage";
import { Sommaire, ElementSommaire } from "../ui/sommaire";

/**
 * Page d'accueil de l'application
 */
export class PageAccueil extends Page {
    /**
     * @param {Ecran} ecran L'écran auquel cette page est rattachée
     */
    constructor(ecran) {
        super("pageAccueil", ecran);

        this._sommaire = new Sommaire();

        let boutonEncyclopedie = this.element.querySelector("#accueilEncyclopedie");
        boutonEncyclopedie.onclick = () => Routeur.empileEcran(new EcranEncyclopedie());
        this._sommaire.ajouteElementNavigation(new ElementSommaire(
            boutonEncyclopedie.innerHTML,
            ">",
            () => boutonEncyclopedie.onclick()
        ));

        let boutonPersonnages = this.element.querySelector("#accueilPersonnages");
        boutonPersonnages.onclick = () => Routeur.empileEcran(new EcranGestionPersonnage());
        this._sommaire.ajouteElementNavigation(new ElementSommaire(
            boutonPersonnages.innerHTML,
            ">",
            () => boutonPersonnages.onclick()
        ));
    }
}