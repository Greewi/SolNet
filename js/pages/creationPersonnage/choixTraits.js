import { Page } from "../page";
import { Ecran } from "../../ecrans/ecran";
import { Personnage } from "../../personnages/personnage";
import { Element } from "../../personnages/element";
import { SelecteurElementSpecial, SelecteurAjoutElement } from "./selecteur";

/**
 * Page de choix des relations du personnage
 */
export class PageChoixTraits extends Page{
    /**
     * @param {Ecran} ecran L'écran auquel cette page est rattachée
     * @param {Personnage} personnage Le personnage à créer
     */
    constructor(ecran, personnage, pagePrecedent, pageSuivante){
        super("creationPersonnagePageTraits", ecran, pagePrecedent, pageSuivante);

        this._personnage = personnage;
        this._elementsPersonnage = personnage.elements;
        this._traitsPersonnage = personnage.elements.traits;

        this._listeTraitsCaracteres = this.element.querySelector("#creationPersonnageTraitsCaractere");
        this._listeTraitsPhysiques = this.element.querySelector("#creationPersonnageTraitsPhysiques");

        this._creationPersonnageTraitCaractereAjouter = this.element.querySelector("#creationPersonnageTraitCaractereAjouter");
        this._inputAjouterTraitCaractere = new SelecteurAjoutElement("Trait de caractère");
        this._inputAjouterTraitCaractere.onadd = (nom)=>{
            this._traitsPersonnage.push(new Element(null, Element.TRAIT_CARACTERE, nom, 1));
            this._ajouteTraitCaractere(nom);
            this.scrollEnBas();
        };
        this._creationPersonnageTraitCaractereAjouter.appendChild(this._inputAjouterTraitCaractere.element);

        this._creationPersonnageTraitPhysiqueAjouter = this.element.querySelector("#creationPersonnageTraitPhysiqueAjouter");
        this._inputAjouterTraitPhysique = new SelecteurAjoutElement("Trait physique");
        this._inputAjouterTraitPhysique.onadd = (nom)=>{
            this._traitsPersonnage.push(new Element(null, Element.TRAIT_PHYSIQUE, nom, 1));
            this._ajouteTraitPhysique(nom);
            this.scrollEnBas();
        };
        this._creationPersonnageTraitPhysiqueAjouter.appendChild(this._inputAjouterTraitPhysique.element);
    }

    /**
     * @override
     * @inheritdoc
     */
    ouvre(avancer){
        super.ouvre(avancer);
        this._listeTraitsCaracteres.innerHTML = "";
        this._listeTraitsPhysiques.innerHTML = "";

        for(let trait of this._traitsPersonnage)
        {
            if(trait.type == Element.TRAIT_CARACTERE)
                this._ajouteTraitCaractere(trait.nom);
            else if(trait.type == Element.TRAIT_PHYSIQUE)
                this._ajouteTraitPhysique(trait.nom);
        }
    }

    /**
     * Ajoute un trait de caractère dans la liste
     * @param {string} nom 
     */
    _ajouteTraitCaractere(nom){
        let selecteur = new SelecteurElementSpecial(nom);
        selecteur.selectionne();
        selecteur.onsupprime = ()=>{
            for(var i=0; i<this._traitsPersonnage.length; i++)
            {
                if(trait.type == Element.TRAIT_CARACTERE && this._traitsPersonnage[i].nom == nom)
                {
                    this._traitsPersonnage.splice(i, 1);
                    break;
                }
            }
            selecteur.element.remove();
        };
        this._listeTraitsCaracteres.appendChild(selecteur.element);
    }
    
    /**
     * Ajoute un trait physique dans la liste
     * @param {string} nom 
     */
    _ajouteTraitPhysique(nom){
        let selecteur = new SelecteurElementSpecial(nom);
        selecteur.selectionne();
        selecteur.onsupprime = ()=>{
            for(var i=0; i<this._traitsPersonnage.length; i++)
            {
                if(trait.type == Element.TRAIT_CARACTERE && this._traitsPersonnage[i].nom == nom)
                {
                    this._traitsPersonnage.splice(i, 1);
                    break;
                }
            }
            selecteur.element.remove();
        };
        this._listeTraitsPhysiques.appendChild(selecteur.element);
    }

    detruit(){
        super.detruit();
        this._boutonAjouterTrait.removeEventListener(this._actionBoutonAjouterTrait);
    }
}