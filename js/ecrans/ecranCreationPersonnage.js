import { Ecran } from "./ecran";
import { PageIntroduction } from "../pages/creationPersonnage/introduction";
import { PageChoixRole } from "../pages/creationPersonnage/choixRole";
import { PageIdentite } from "../pages/creationPersonnage/identite";
import { Personnage } from "../personnages/personnage";

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
            "identite" : new PageIdentite(this, personnage),
        });
        super.setPageParDefaut("introduction");
    }
}