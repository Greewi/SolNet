import { Page } from "../page";
import { Ecran } from "../../ecrans/ecran";
import { Personnage } from "../../personnages/personnage";
import { BanqueDonnees } from "../../donneeSources";
import { Element } from "../../personnages/element";
import { SelecteurElementSpecial, SelecteurSimple } from "./selecteur";
import { Lang } from "../../lang";

/**
 * Page de choix des modifications du personnage
 */
export class PageChoixModifications extends Page{
    /**
     * @param {Ecran} ecran L'écran auquel cette page est rattachée
     * @param {Personnage} personnage Le personnage à créer
     */
    constructor(ecran , personnage, pagePrecedent, pageSuivante){
        super("pageCreationPersonnageModifications", ecran, pagePrecedent, pageSuivante);

        this._personnage = personnage;
        this._rolesPersonnage = personnage.roles;
        this._elementsPersonnage = personnage.elements;
        this._modificationsPersonnage = personnage.elements.modifications;

        this._listeModification = this.element.querySelector("#creationPersonnageModifications");
        this._listeModificationCustom = this.element.querySelector("#creationPersonnageModificationsCustom");

        this._boutonAjouterModification = this.element.querySelector("#creationPersonnageModificationsAjouter");
        this._inputAjouterModification = this._boutonAjouterModification.querySelector("input");
        this._actionBoutonAjouterModification = (event) => {
            event.preventDefault();
            let nom = this._inputAjouterModification.value;
            if(nom && nom.trim()!="")
            {
                this._modificationsPersonnage.push(new Element(null, Element.MODIFICATION_PERSO, nom, 1));
                this._ajouteModificationPersonnalisee(nom);
                this._inputAjouterModification.blur();
            }
            else if(document.activeElement != this._inputAjouterModification)
                this._inputAjouterModification.focus();
            else
                this._inputAjouterModification.blur();
            this._inputAjouterModification.value = "";
            this.scrollEnBas();    
        };
        this._boutonAjouterModification.addEventListener("submit", this._actionBoutonAjouterModification);
    }

    /**
     * @override
     * @inheritdoc
     */
    ouvre(avancer){
        super.ouvre(avancer);
        this._listeModification.innerHTML = "";
        this._listeModificationCustom.innerHTML = "";

        // Carrières personnalisées
        for(let modification of this._modificationsPersonnage)
        {
            if(modification.id == null)
                this._ajouteModificationPersonnalisee(modification.nom);
        }

        // Carrières standardes
        for(let idModification in BanqueDonnees.modifications)
        {
            let modification = BanqueDonnees.modifications[idModification];

            let nom = Lang.get(`Modification_${modification.id}`);
            let description = `<em>${nom}</em> : ${Lang.get(`DescriptionModification_${modification.id}`)}`;
            let selecteur = new SelecteurSimple(nom, description);

            //On n'affiche pas les modifications incompatibles
            if(!this._personnage.identite.enveloppeUsuelle || (modification.type!=this._personnage.identite.enveloppeUsuelle.substrat && this._personnage.identite.enveloppeUsuelle.substrat != "MIXTE"))
                continue;

            //Sélection/Déselection de la carrière
            if(this._elementsPersonnage.possedeModification(modification.id))
                selecteur.selectionne();
            selecteur.onclick = (e) => {
                if(this._elementsPersonnage.possedeModification(modification.id))
                {
                    for(var i=0; i<this._modificationsPersonnage.length; i++)
                    {
                        if(this._modificationsPersonnage[i].id == modification.id)
                        {
                            this._modificationsPersonnage.splice(i, 1);
                            break;
                        }
                    }
                    selecteur.deselectionne();
                }
                else
                {
                    this._modificationsPersonnage.push(new Element(modification.id, Element.MODIFICATION_BASE, Lang.get(`Modification_${modification.id}`), 1));
                    selecteur.selectionne();
                }
            };

            this._listeModification.appendChild(selecteur.element);
        }
    }

    _ajouteModificationPersonnalisee(nom){
        let selecteur = new SelecteurElementSpecial(nom);
        selecteur.selectionne();
        selecteur.onsupprime = ()=>{
            for(var i=0; i<this._modificationsPersonnage.length; i++)
            {
                if(this._modificationsPersonnage[i].nom == nom)
                {
                    this._modificationsPersonnage.splice(i, 1);
                    break;
                }
            }
            selecteur.element.remove();
        };
        this._listeModificationCustom.appendChild(selecteur.element);
    }

    detruit(){
        super.detruit();
        this._boutonAjouterModification.removeEventListener(this._actionBoutonAjouterModification);
    }
}