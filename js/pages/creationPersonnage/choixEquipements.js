import { Ecran } from "../../ecrans/ecran";
import { Personnage } from "../../personnages/personnage";
import { BanqueDonnees } from "../../donneeSources";
import { Element } from "../../personnages/element";
import { AbstractPageChoixMateriel } from "./abstractChoixMateriel";

/**
 * Page de choix des modifications du personnage
 */
export class PageChoixEquipements extends AbstractPageChoixMateriel{
    /**
     * @param {Ecran} ecran L'écran auquel cette page est rattachée
     * @param {Personnage} personnage Le personnage à créer
     */
    constructor(ecran , personnage){
        let template = "pageCreationPersonnageEquipements";
        let module = "Equipement";
        let listeMaterielPersonnage = personnage.elements.equipements;
        let listeMateriel = BanqueDonnees.equipements;
        let typeMaterielBase = Element.EQUIPEMENT_BASE;
        let typeMaterielCustom = Element.EQUIPEMENT_PERSO;
        let filtre = function(materiel){
            return true;
        };

        super(ecran, template, module, personnage, listeMaterielPersonnage, listeMateriel, typeMaterielBase, typeMaterielCustom, filtre)
    }
}
