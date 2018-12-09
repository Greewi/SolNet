import { Ecran } from "./ecran";
import { PageIntroduction } from "../pages/creationPersonnage/introduction";
import { PageChoixRole } from "../pages/creationPersonnage/choixRole";
import { PageIdentite } from "../pages/creationPersonnage/identite";
import { Personnage } from "../personnages/personnage";
import { PageChoixCarrieres } from "../pages/creationPersonnage/choixCarrieres";
import { PageChoixEsprit } from "../pages/creationPersonnage/choixEsprit";
import { PageChoixEnveloppe } from "../pages/creationPersonnage/choixEnveloppe";
import { PageChoixRelations } from "../pages/creationPersonnage/choixRelations";
import { PageChoixTraits } from "../pages/creationPersonnage/choixTraits";
import { PageEvaluation } from "../pages/creationPersonnage/evaluationElements";
import { PageChoixModifications } from "../pages/creationPersonnage/choixModifications";
import { PageChoixEquipements } from "../pages/creationPersonnage/choixEquipements";
import { PageChoixLogiciels } from "../pages/creationPersonnage/choixLogiciels";
import { PageDescriptionPhysique, PageDescriptionAvatar } from "../pages/creationPersonnage/descriptionEtAvatar";

/**
 * Écran de création de personnage
 */
export class EcranCreationPersonnage extends Ecran{
    /**
     * @param {Personnage} personnage Le personnage à créer
     */
    constructor(personnage){
        super();
        super.setPages({
            "introduction" : new PageIntroduction(this, personnage, null, "choixRole"),
            "choixRole" : new PageChoixRole(this, personnage, "introduction", "choixEsprit"),
            "choixEsprit" : new PageChoixEsprit(this, personnage, "choixRole", "choixEnveloppe"),
            "choixEnveloppe" : new PageChoixEnveloppe(this, personnage, "choixEsprit", "choixCarriere"),
            "choixCarriere" : new PageChoixCarrieres(this, personnage, "choixEnveloppe", "choixRelations"),
            "choixRelations" : new PageChoixRelations(this, personnage, "choixCarriere", "choixTraits"),
            "choixTraits" : new PageChoixTraits(this, personnage, "choixRelations", "choixModifications"),
            "choixModifications" : new PageChoixModifications(this, personnage, "choixTraits", "choixEquipements"),
            "choixEquipements" : new PageChoixEquipements(this, personnage, "choixModifications", "choixLogiciels"),
            "choixLogiciels" : new PageChoixLogiciels(this, personnage, "choixEquipements", "evaluation"),
            "evaluation" : new PageEvaluation(this, personnage, "choixLogiciels", "identite"),
            "identite" : new PageIdentite(this, personnage, "evaluation", "description"),
            "description" : new PageDescriptionPhysique(this, personnage, "identite", "avatar"),
            "avatar" : new PageDescriptionAvatar(this, personnage, "description", null),
        });
        super.setPageParDefaut("introduction");
    }
}