import { Ecran } from "../../ecrans/ecran";
import { Personnage } from "../../personnages/personnage";
import { BanqueDonnees } from "../../donneeSources";
import { Element } from "../../personnages/element";
import { AbstractPageChoixMateriel } from "./abstractChoixMateriel";

/**
 * Page de choix des modifications du personnage
 */
export class PageChoixModifications extends AbstractPageChoixMateriel{
    /**
     * @param {Ecran} ecran L'écran auquel cette page est rattachée
     * @param {Personnage} personnage Le personnage à créer
     */
    constructor(ecran , personnage, pagePrecedent, pageSuivante){
        let template = "pageCreationPersonnageModifications";
        let module = "Modification";
        let listeMaterielPersonnage = personnage.elements.modifications;
        let listeMateriel = BanqueDonnees.modifications;
        let typeMaterielBase = Element.MODIFICATION_BASE;
        let typeMaterielCustom = Element.MODIFICATION_PERSO;
        let filtre = function(materiel){
            if(!personnage.identite.enveloppeUsuelle || (materiel.type!=personnage.identite.enveloppeUsuelle.substrat && personnage.identite.enveloppeUsuelle.substrat != "MIXTE"))
                return false;
            return true;
        };

        super(ecran, template, module, personnage, listeMaterielPersonnage, listeMateriel, typeMaterielBase, typeMaterielCustom, filtre, pagePrecedent, pageSuivante)
    }
}