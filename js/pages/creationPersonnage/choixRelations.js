import { Page } from "../page";
import { Ecran } from "../../ecrans/ecran";
import { Personnage } from "../../personnages/personnage";
import { BanqueDonnees } from "../../donneeSources";
import { Element } from "../../personnages/element";
import { Selecteur, SelecteurAvecPrerequis, SelecteurElementSpecial, SelecteurSimple } from "../selecteur";
import { Lang } from "../../lang";


/**
 * Page de choix des relations du personnage
 */
export class PageChoixRelations extends Page{
    /**
     * @param {Ecran} ecran L'écran auquel cette page est rattachée
     * @param {Personnage} personnage Le personnage à créer
     */
    constructor(ecran , personnage){
        super("pageCreationPersonnageRelations", ecran);

        this._personnage = personnage;
        this._elementsPersonnage = personnage.elements;
        this._relationsPersonnage = personnage.elements.relations;

        this._listeRelations = this.element.querySelector("#creationPersonnageRelations");
        this._listeCarrieresCustom = this.element.querySelector("#creationPersonnageRelationsCustom");

        this._boutonAjouterRelation = this.element.querySelector("#creationPersonnageRelationsAjouter");
        this._inputAjouterRelation = this._boutonAjouterRelation.querySelector("input");
        this._actionBoutonAjouterRelation = (event) => {
            event.preventDefault();
            let nom = this._inputAjouterRelation.value;
            if(nom && nom.trim()!="")
            {
                this._relationsPersonnage.push(new Element(null, Element.RELATION_PERSO, nom, 1));
                this._ajouteRelationPersonnalisee(nom);
                this._inputAjouterRelation.blur();
            }
            else if(document.activeElement != this._inputAjouterRelation)
                this._inputAjouterRelation.focus();
            else
                this._inputAjouterRelation.blur();
            this._inputAjouterRelation.value = "";
        };
        this._boutonAjouterRelation.addEventListener("submit", this._actionBoutonAjouterRelation);
    }

    /**
     * @override
     * @inheritdoc
     */
    ouvre(avancer){
        super.ouvre(avancer);
        this._listeRelations.innerHTML = "";
        this._listeCarrieresCustom.innerHTML = "";

        let factions = BanqueDonnees.factions;

        // Relations personnalisées
        for(let relation of this._relationsPersonnage)
        {
            if(relation.id == null)
                this._ajouteRelationPersonnalisee(relation.nom);
        }

        // Relations standardes
        for(let idRelation in factions)
        {
            let nom = Lang.get(`Faction_${idRelation}`);
            let description = `<em>${nom}</em> : ${Lang.get(`DescriptionFaction_${idRelation}`)}`;
            let selecteur = new SelecteurSimple(nom, description);

            //Sélection/Déselection de la carrière
            if(this._elementsPersonnage.possedeRelation(idRelation))
                selecteur.selectionne();
            selecteur.onclick = (e) => {
                if(this._elementsPersonnage.possedeRelation(idRelation))
                {
                    for(var i=0; i<this._relationsPersonnage.length; i++)
                    {
                        if(this._relationsPersonnage[i].id == idRelation)
                        {
                            this._relationsPersonnage.splice(i, 1);
                            break;
                        }
                    }
                    selecteur.deselectionne();
                }
                else
                {
                    this._relationsPersonnage.push(new Element(idRelation, Element.RELATION_BASE, Lang.get(`Faction_${idRelation}`), 1));
                    selecteur.selectionne();
                }
            };

            this._listeRelations.appendChild(selecteur.element);
        }
    }

    _ajouteRelationPersonnalisee(nom){
        let selecteur = new SelecteurElementSpecial(nom);
        selecteur.selectionne();
        selecteur.onsupprime = ()=>{
            for(var i=0; i<this._relationsPersonnage.length; i++)
            {
                if(this._relationsPersonnage[i].nom == nom)
                {
                    this._relationsPersonnage.splice(i, 1);
                    break;
                }
            }
            selecteur.element.remove();
        };
        this._listeCarrieresCustom.appendChild(selecteur.element);
    }

    detruit(){
        super.detruit();
        this._boutonAjouterRelation.removeEventListener("submit", this._actionBoutonAjouterRelation);
    }
}