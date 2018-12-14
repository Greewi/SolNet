import { Ecran } from "./ecran";
import { PageListePersonnages } from "../pages/gestionPersonnage/listePersonnages";

/**
 * Écran de gestion de personnage
 */
export class EcranGestionPersonnage extends Ecran{
    /**
     * @param {Personnage} personnage Le personnage à créer
     */
    constructor(personnage){
        super();
        super.setPages({
            "listePersonnages" : new PageListePersonnages(this, null, null),
        });
        super.setPageParDefaut("listePersonnages");
    }
}