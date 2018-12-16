import { Ecran } from "./ecran";
import { BibliothequePersonnage } from "../bibliothequePersonnage";
import { EcranGestionPersonnage } from "./ecranGestionPersonnage";
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
import { Routeur } from "../routeur";
import { Lang } from "../lang";

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
            "introduction" : new PageIntroduction(this, personnage),
            "choixRole" : new PageChoixRole(this, personnage),
            "choixEsprit" : new PageChoixEsprit(this, personnage),
            "choixEnveloppe" : new PageChoixEnveloppe(this, personnage),
            "choixCarriere" : new PageChoixCarrieres(this, personnage),
            "choixModifications" : new PageChoixModifications(this, personnage),
            "choixEquipements" : new PageChoixEquipements(this, personnage),
            "choixLogiciels" : new PageChoixLogiciels(this, personnage),
            "choixRelations" : new PageChoixRelations(this, personnage),
            "choixTraits" : new PageChoixTraits(this, personnage),
            "evaluation" : new PageEvaluation(this, personnage),
            "identite" : new PageIdentite(this, personnage),
            "description" : new PageDescriptionPhysique(this, personnage),
            "avatar" : new PageDescriptionAvatar(this, personnage),
        });
        super.setPageParDefaut("introduction");
        super.setOrdrePages([
            "introduction",
            "choixRole",
            "choixEsprit",
            "choixEnveloppe",
            "choixCarriere",
            "choixModifications",
            "choixEquipements",
            "choixLogiciels",
            "choixRelations",
            "choixTraits",
            "evaluation",
            "identite",
            "description",
            "avatar",
        ]);
        super.setActionRetour(()=>{
            let ecranListePersonnage = new EcranGestionPersonnage();
            Routeur.ouvreEcran(ecranListePersonnage);
        }, Lang.get("BoutonQuitter"));
        this._personnage = personnage;
    }

    /**
     * @override
     * @inheritdoc
     */
    ouvre(page, avancer){
        BibliothequePersonnage.sauvegardePersonnage(this._personnage);
        super.ouvre(page, avancer);
    }

    /**
    * @override
    * @inheritdoc
    */
    ferme(){
        BibliothequePersonnage.sauvegardePersonnage(this._personnage);
        super.ferme();
    }
}