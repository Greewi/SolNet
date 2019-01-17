import { Page } from "../page";
import { Ecran } from "../../ecrans/ecran";
import { Routeur } from "../../routeur";
import { EcranGestionPersonnage } from "../../ecrans/ecranGestionPersonnage";

/**
 * Page de fin de création d'un personnage de l'application
 */
export class PageFinCreationPersonnage extends Page{
    /**
     * @param {Ecran} ecran L'écran auquel cette page est rattachée
     */
    constructor(ecran){
        super("pageCreationPersonnageFin", ecran);
        let boutonPersonnages = this.element.querySelector("#creationPersonnageRetourAccueil");
        boutonPersonnages.onclick = ()=>{
            Routeur.ouvreEcran(new EcranGestionPersonnage());
        };
    }
}