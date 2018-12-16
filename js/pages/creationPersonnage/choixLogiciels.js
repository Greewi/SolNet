import { Ecran } from "../../ecrans/ecran";
import { Personnage } from "../../personnages/personnage";
import { BibliothequeDonnees } from "../../ressources/donneeSources";
import { Element } from "../../personnages/element";
import { AbstractPageChoixMateriel } from "./abstractChoixMateriel";

/**
 * Page de choix des modifications du personnage
 */
export class PageChoixLogiciels extends AbstractPageChoixMateriel{
    /**
     * @param {Ecran} ecran L'écran auquel cette page est rattachée
     * @param {Personnage} personnage Le personnage à créer
     */
    constructor(ecran , personnage){
        let template = "pageCreationPersonnageLogiciels";
        let module = "Logiciel";
        let listeMaterielPersonnage = personnage.elements.logiciels;
        let listeMateriel = BibliothequeDonnees.logiciels;
        let typeMaterielBase = Element.LOGICIEL_BASE;
        let typeMaterielCustom = Element.LOGICIEL_PERSO;
        let filtre = function(materiel){
            return true;
        };

        super(ecran, template, module, personnage, listeMaterielPersonnage, listeMateriel, typeMaterielBase, typeMaterielCustom, filtre)
    }
}
