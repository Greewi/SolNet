import { Ecran } from "./ecran";
import { Routeur } from "../routeur";
import { Personnage } from "../personnages/personnage";
import { PageAfficherPersonnage } from "../pages/gestionPersonnage/affichagePersonnage";
import { EcranGestionPersonnage } from "./ecranGestionPersonnage";
import { BibliothequeThemes } from "../ressources/themes";

/**
 * Écran d'affichage des personnage
 */
export class EcranAffichagePersonnage extends Ecran{
    /**
     * Constructeur
     * @param {Personnage} personnage
     */
    constructor(personnage){
        super();
        super.setPages({
            "personnage" : new PageAfficherPersonnage(this, personnage)
        });
        super.setPageParDefaut("personnage");
        super.setActionRetour(()=>{
            Routeur.ouvreEcran(new EcranGestionPersonnage());
        });
        BibliothequeThemes.setTheme("mars");
    }

    /**
     * @override
     * @inheritdoc
     */
    ouvre(page, animation){
        super.ouvre(page, animation);
    }
}