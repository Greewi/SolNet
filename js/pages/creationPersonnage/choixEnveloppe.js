import { Page } from "../page";
import { Ecran } from "../../ecrans/ecran";
import { Personnage } from "../../personnages/personnage";
import { BanqueDonnees } from "../../donneeSources";
import { Selecteur, SelecteurAvecPrerequis } from "./selecteur";
import { Lang } from "../../lang";
import { Element } from "../../personnages/element";

/**
 * Page de choix de l'enveloppe usuelle du personnage
 */
export class PageChoixEnveloppe extends Page{
    /**
     * @param {Ecran} ecran L'écran auquel cette page est rattachée
     * @param {Personnage} personnage Le personnage à créer
     */
    constructor(ecran , personnage, pagePrecedent, pageSuivante){
        super("pageCreationPersonnageEnveloppe", ecran, pagePrecedent, pageSuivante);
        this._personnage = personnage;
        this._rolesPersonnage = personnage.roles;
        this._elementsPersonnage = personnage.elements;
        this._traitsPersonnage = personnage.elements.traits;

        this._listeEnveloppes = this.element.querySelector("#creationPersonnageEnveloppe");
    }

    /**
     * @override
     * @inheritdoc
     */
    ouvre(avancer){
        super.ouvre(avancer);
        this._listeEnveloppes.innerHTML = "";
        let intelligences = BanqueDonnees.intelligences;
        let enveloppes = BanqueDonnees.enveloppes;
        for(let idEnveloppe in enveloppes)
        {
            let enveloppe = enveloppes[idEnveloppe];
            let nom = Lang.get(`Enveloppe_${idEnveloppe}`);
            var listeEsprits = "";
            for(let idIntelligence in intelligences)
            {
                let intelligence = intelligences[idIntelligence];
                for(let idEnveloppe of intelligence.enveloppes)
                {
                    let nomIntelligence = Lang.get(`Intelligence_${idIntelligence}`);
                    if(idEnveloppe == enveloppe.id)
                    {
                        if(listeEsprits=="")
                            listeEsprits = `<em>${nomIntelligence}</em>`;
                        else
                            listeEsprits+=`, <em>${nomIntelligence}</em>`;
                    }
                }
            }
            var listeModeles = "";
            for(let modele of enveloppe.modeles)
                if(listeModeles=="")
                    listeModeles = `<em>${modele}</em>`;
                else
                    listeModeles+=`, <em>${modele}</em>`;
            let description = `<em>${nom}</em> (depuis ${enveloppe.dateInitiale}) : ${Lang.get(`DescriptionEnveloppe_${idEnveloppe}`)}.<br/> Modèles : ${listeModeles}. <br/> Esprit compatibles : ${listeEsprits}.`;
            let selecteur = new SelecteurAvecPrerequis(nom, description);

            //Liste des enveloppes compatibles
            var estCompatible = false;
            if(this._personnage.identite.natureEsprit)
            {
                for(let idEnveloppeActuelle of this._personnage.identite.natureEsprit.enveloppes)
                    if(idEnveloppe==idEnveloppeActuelle)
                        estCompatible = true;
                if(estCompatible)
                    selecteur.ajoutePrerequis("Esprit compatible", true);
                else
                    selecteur.ajoutePrerequis("Esprit non compatible", false);
            }
            
            //Sélection/Déselection de l'enveloppe
            if(this._personnage.identite.enveloppeUsuelle && this._personnage.identite.enveloppeUsuelle.id == idEnveloppe)
                selecteur.selectionne();
            selecteur.onclick = (e)=>{
                Selecteur.deselectionneTous(this._listeEnveloppes);
                this._personnage.identite.enveloppeUsuelle = enveloppe;
                for(var i=0; i<this._traitsPersonnage.length; i++)
                {
                    if(this._traitsPersonnage[i].type == Element.TRAIT_ENVELOPPE)
                    {
                        this._traitsPersonnage.splice(i, 1);
                        break;
                    }
                }
                this._traitsPersonnage.push(new Element(enveloppe.id, Element.TRAIT_ENVELOPPE, nom, 1));
                selecteur.selectionne();
            };
            
            this._listeEnveloppes.appendChild(selecteur.element);
        }
    }

    detruit(){
        super.detruit();
    }
}