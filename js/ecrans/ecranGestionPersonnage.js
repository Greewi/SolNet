import { Ecran } from "./ecran";
import { PageListePersonnages } from "../pages/gestionPersonnage/listePersonnages";
import { PageImporterPersonnage } from "../pages/gestionPersonnage/importationPersonnage";

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
            "listePersonnages" : new PageListePersonnages(this),
            "importerPersonnage" : new PageImporterPersonnage(this),
        });
        super.setPageParDefaut("listePersonnages");
    }

    /**
     * @override
     * @inheritdoc
     */
    ouvre(page, avancer){

        if(page=="importerPersonnage")
        {
            super.setActionRetour(()=>{
                this.ouvre("listePersonnages", false);
            });
        }
        else
        {
            super.setActionRetour(null);
        }

        super.ouvre(page, avancer);
    }

}