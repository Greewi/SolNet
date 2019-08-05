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
            "personnage" : new PageAfficherPersonnage(this, personnage),
            "personnageRoll20" : new PageAfficherPersonnage(this, personnage, "pagePersonnageAfficherRoll20")
        });
        super.setOrdrePages([
            "personnage", "personnageRoll20"
        ]);
        super.setPageParDefaut("personnage");
        super.setActionRetour(()=>{
            Routeur.depileEcran(this);
        });
    }

    /**
     * @override
     * @inheritdoc
     */
    ouvre(page, animation){
        BibliothequeThemes.setTheme("mars");
        super.ouvre(page, animation);
    }

    getTitre(){
        return null;
    }
}