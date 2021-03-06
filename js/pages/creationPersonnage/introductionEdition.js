import { Page } from "../page";
import { Ecran } from "../../ecrans/ecran";
import { Personnage } from "../../personnages/personnage";
import { Sommaire } from "../../ui/sommaire";

/**
 * Page d'introduction de la création de personnage
 */
export class PageIntroductionEdition extends Page{
    /**
     * @param {Ecran} ecran L'écran auquel cette page est rattachée
     * @param {Personnage} personnage Le personnage à créer
     */
    constructor(ecran , personnage){
        super("pageCreationPersonnageIntroductionEdition", ecran);
        this._personnage = personnage;
        this._boutons = [];

        this._sommaire = new Sommaire();

        this.creeBoutonLien("editionPersonnageRoles", "choixRole");
        this.creeBoutonLien("editionPersonnageEsprit", "choixEsprit");
        this.creeBoutonLien("editionPersonnageEnveloppe", "choixEnveloppe");
        this.creeBoutonLien("editionPersonnageCarrieres", "choixCarriere");
        this.creeBoutonLien("editionPersonnageModifications", "choixModifications");
        this.creeBoutonLien("editionPersonnageEquipement", "choixEquipements");
        this.creeBoutonLien("editionPersonnageLogiciels", "choixLogiciels");
        this.creeBoutonLien("editionPersonnageRelations", "choixRelations");
        this.creeBoutonLien("editionPersonnageTraits", "choixTraits");
        this.creeBoutonLien("editionPersonnageEvaluation", "evaluation");
        this.creeBoutonLien("editionPersonnageIdentite", "identite");
        this.creeBoutonLien("editionPersonnageDescription", "description");
        this.creeBoutonLien("editionPersonnageAvatar", "avatar");
        this.creeBoutonLien("editionPersonnageOpinions", "opinions");
        this.creeBoutonLien("editionPersonnageMotivation", "motivation");
        this.creeBoutonLien("editionPersonnageNaissance", "naissance");
        this.creeBoutonLien("editionPersonnageHistorique", "historique");
    }

    creeBoutonLien(idBouton, idPage){
        let bouton = this.element.querySelector(`#${idBouton}`);
        let action = ()=>{
            this.ecran.ouvre(idPage, Page.AVANCER);
        };
        bouton.addEventListener("click", action);
        this._boutons.push({bouton : bouton, action : action});
        this._sommaire.ajoute(bouton.innerHTML, ">", action);
    }

    detruit(){
        super.detruit();
        for(var i=0; i<this._boutons.length; i++)
            this._boutons[i].bouton.removeEventListener("click",  this._boutons[i].action);
    }
}