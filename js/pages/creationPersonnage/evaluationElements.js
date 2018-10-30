import { Page } from "../page";
import { Ecran } from "../../ecrans/ecran";
import { Personnage } from "../../personnages/personnage";
import { Element } from "../../personnages/element";
import { Selecteur, SelecteurAvecPrerequis, SelecteurElementSpecial, SelecteurSimple, SelecteurAjoutElement, SelecteurValeurElement } from "./selecteur";

/**
 * Page de choix des relations du personnage
 */
export class PageEvaluation extends Page{
    /**
     * @param {Ecran} ecran L'écran auquel cette page est rattachée
     * @param {Personnage} personnage Le personnage à créer
     */
    constructor(ecran , personnage){
        super("creationPersonnagePageEvaluation", ecran);

        this._personnage = personnage;
        this._elementsPersonnage = personnage.elements;
        this._carrieresPersonnage = personnage.elements.carrieres;
        this._relationsPersonnage = personnage.elements.relations;
        this._traitsPersonnage = personnage.elements.traits;

        this._listeCarrieres = this.element.querySelector("#creationPersonnageEvaluationCarrieres");
        this._listeRelations = this.element.querySelector("#creationPersonnageEvaluationRelations");
        this._listeTraits = this.element.querySelector("#creationPersonnageEvaluationTraits");

        this._boutonPrecedent = this.element.querySelector(".bouton-precedent");
        this._actionBoutonPrecedent = (event) => {
            this.ecran.ouvre("choixTraits", false);
        };
        this._boutonPrecedent.addEventListener("click", this._actionBoutonPrecedent);

        this._boutonSuivant = this.element.querySelector(".bouton-suivant");
        this._actionBoutonSuivant = (event) => {
        //    this.ecran.ouvre("identite", true);
        };
        this._boutonSuivant.addEventListener("click", this._actionBoutonSuivant);
    }

    /**
     * @override
     * @inheritdoc
     */
    ouvre(avancer){
        super.ouvre(avancer);
        this._listeCarrieres.innerHTML = "";
        for(let carriere of this._carrieresPersonnage)
        {
            let selecteur = new SelecteurValeurElement(carriere.nom, ["Débutant", "Professionnel", "Expert"], carriere.score);
            selecteur.onchange = (valeur) => {
                carriere.score = valeur;
            };
            this._listeCarrieres.appendChild(selecteur.element);
        }

        this._listeRelations.innerHTML = "";
        for(let relation of this._relationsPersonnage)
        {
            let selecteur = new SelecteurValeurElement(relation.nom, ["Contacts", "Alliés", "Amis"], relation.score);
            selecteur.onchange = (valeur) => {
                relation.score = valeur;
            };
            this._listeRelations.appendChild(selecteur.element);
        }

        this._listeTraits.innerHTML = "";
        for(let trait of this._traitsPersonnage)
        {
            let selecteur = new SelecteurValeurElement(trait.nom, ["Léger", "Important", "Extrême"], trait.score);
            selecteur.onchange = (valeur) => {
                trait.score = valeur;
            };
            this._listeTraits.appendChild(selecteur.element);
        }
    }

    detruit(){
        super.detruit();
        this._boutonPrecedent.removeEventListener(this._actionBoutonPrecedent);
        this._boutonSuivant.removeEventListener(this._actionBoutonSuivant);
        this._boutonAjouterTrait.removeEventListener(this._actionBoutonAjouterTrait);
    }
}