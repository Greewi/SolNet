import { Ecran } from "./ecran";
import { PageListePersonnages } from "../pages/gestionPersonnage/listePersonnages";
import { PageImporterPersonnage } from "../pages/gestionPersonnage/importationPersonnage";
import { Routeur } from "../routeur";
import { EcranAccueil } from "./ecranAccueil";
import { Page } from "../pages/page";

/**
 * Écran de gestion de personnage
 */
export class EcranGestionPersonnage extends Ecran{
    /**
     * Constructeur
     */
    constructor(){
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
    ouvre(page, animation){

        if(page=="importerPersonnage")
        {
            super.setActionRetour(()=>{
                this.ouvre("listePersonnages", Page.RECULER);
            });
        }
        else
        {
            super.setActionRetour(()=>{
                Routeur.ouvreEcran(new EcranAccueil());
            });
        }

        super.ouvre(page, animation);
    }
}