import { Page } from "../page";
import { Ecran } from "../../ecrans/ecran";
import { Personnage } from "../../personnages/personnage";
import { SelecteurValeurElement } from "../../ui/selecteur";
import { Lang } from "../../lang";

/**
 * Page de choix des relations du personnage
 */
export class PageEvaluation extends Page{
    /**
     * @param {Ecran} ecran L'écran auquel cette page est rattachée
     * @param {Personnage} personnage Le personnage à créer
     */
    constructor(ecran , personnage){
        super("pageCreationPersonnageEvaluation", ecran);

        this._personnage = personnage;
        this._elementsPersonnage = personnage.elements;
        this._carrieresPersonnage = personnage.elements.carrieres;
        this._relationsPersonnage = personnage.elements.relations;
        this._traitsPersonnage = personnage.elements.traits;
        this._modificationsPersonnage = personnage.elements.modifications;
        this._equipementsPersonnage = personnage.elements.equipements;
        this._logicielsPersonnage = personnage.elements.logiciels;

        this._labelCarrieres = this.element.querySelector("#creationPersonnageLabelEvaluationCarrieres");
        this._labelRelations = this.element.querySelector("#creationPersonnageLabelEvaluationRelations");
        this._labelTraits = this.element.querySelector("#creationPersonnageLabelEvaluationTraits");
        this._labelModifications = this.element.querySelector("#creationPersonnageLabelEvaluationModifications");
        this._labelEquipements = this.element.querySelector("#creationPersonnageLabelEvaluationEquipements");
        this._labelLogiciels = this.element.querySelector("#creationPersonnageLabelEvaluationLogiciels");

        this._listeCarrieres = this.element.querySelector("#creationPersonnageEvaluationCarrieres");
        this._listeRelations = this.element.querySelector("#creationPersonnageEvaluationRelations");
        this._listeTraits = this.element.querySelector("#creationPersonnageEvaluationTraits");
        this._listeModifications = this.element.querySelector("#creationPersonnageEvaluationModifications");
        this._listeEquipements = this.element.querySelector("#creationPersonnageEvaluationEquipements");
        this._listeLogiciels = this.element.querySelector("#creationPersonnageEvaluationLogiciels");
    }

    /**
     * @override
     * @inheritdoc
     */
    ouvre(animation){
        super.ouvre(animation);
        this.genereListeElement(this._labelCarrieres, this._carrieresPersonnage, this._listeCarrieres, "NiveauCarriere");
        this.genereListeElement(this._labelRelations, this._relationsPersonnage, this._listeRelations, "NiveauRelation");
        this.genereListeElement(this._labelTraits, this._traitsPersonnage, this._listeTraits, "NiveauTrait");
        this.genereListeElement(this._labelModifications, this._modificationsPersonnage, this._listeModifications, "NiveauMateriel");
        this.genereListeElement(this._labelEquipements, this._equipementsPersonnage, this._listeEquipements, "NiveauMateriel");
        this.genereListeElement(this._labelLogiciels, this._logicielsPersonnage, this._listeLogiciels, "NiveauMateriel");
    }

    genereListeElement(labelListe, listeElements, listeHTML, fragmentValeurs)
    {
        labelListe.style.display = listeElements.length==0 ? "none" : "block";

        let valeurs = [Lang.get(`${fragmentValeurs}_0`), Lang.get(`${fragmentValeurs}_1`), Lang.get(`${fragmentValeurs}_2`), Lang.get(`${fragmentValeurs}_3`)];
        listeHTML.innerHTML = "";
        for(let element of listeElements)
        {
            let selecteur = new SelecteurValeurElement(element.nom, valeurs, element.score);
            selecteur.onchange = (valeur) => {
                element.score = valeur;
            };
            listeHTML.appendChild(selecteur.element);
        }
    }

    detruit(){
        super.detruit();
    }
}