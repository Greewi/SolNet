import { Page } from "../page";
import { Ecran } from "../../ecrans/ecran";
import { Personnage } from "../../personnages/personnage";
import { BanqueDonnees } from "../../personnages/donneeSources";
import { Selecteur, SelecteurAvecPrerequis } from "./selecteur";
import { Lang } from "../../lang";
import { Element } from "../../personnages/element";

/**
 * Page de choix de la nature d'esprit du personnage
 */
export class PageChoixEsprit extends Page{
    /**
     * @param {Ecran} ecran L'écran auquel cette page est rattachée
     * @param {Personnage} personnage Le personnage à créer
     */
    constructor(ecran , personnage){
        super("creationPersonnagePageEsprit", ecran);
        this._personnage = personnage;
        this._rolesPersonnage = personnage.roles;
        this._elementsPersonnage = personnage.elements;
        this._traitsPersonnage = personnage.elements.traits;

        this._listeIntelligences = this.element.querySelector("#creationPersonnageEsprit");

        this._boutonPrecedent = this.element.querySelector(".bouton-precedent");
        this._actionBoutonPrecedent = (event) => {
            this.ecran.ouvre("choixRole", false);
        };
        this._boutonPrecedent.addEventListener("click", this._actionBoutonPrecedent);

        this._boutonSuivant = this.element.querySelector(".bouton-suivant");
        this._actionBoutonSuivant = (event) => {
            this.ecran.ouvre("choixEnveloppe", true);
        };
        this._boutonSuivant.addEventListener("click", this._actionBoutonSuivant);
    }

    /**
     * @override
     * @inheritdoc
     */
    ouvre(avancer){
        super.ouvre(avancer);
        this._listeIntelligences.innerHTML = "";
        let intelligences = BanqueDonnees.intelligences;
        for(let idIntelligence in intelligences)
        {
            let intelligence = intelligences[idIntelligence];
            let nom = Lang.get(`Intelligence_${idIntelligence}`);
            var listeEnveloppes = "";
            for(let idEnveloppe of intelligence.enveloppes)
            {
                let nomEnveloppe = Lang.get(`Enveloppe_${idEnveloppe}`);
                if(listeEnveloppes=="")
                    listeEnveloppes = `<em>${nomEnveloppe}</em>`;
                else
                    listeEnveloppes+=`, <em>${nomEnveloppe}</em>`;
            }
            let description = `<em>${nom}</em> (depuis ${intelligence.dateInitiale}) : ${Lang.get(`DescriptionIntelligence_${idIntelligence}`)}.<br/> Enveloppes compatibles : ${listeEnveloppes}.`;
            let selecteur = new SelecteurAvecPrerequis(nom, description);

            //Liste des enveloppes compatibles
            var estCompatible = false;
            for(let idEnveloppe of intelligence.enveloppes)
                if(this._personnage.identite.enveloppeUsuelle && this._personnage.identite.enveloppeUsuelle.id == idEnveloppe)
                    estCompatible = true;
            if(estCompatible)
                selecteur.ajoutePrerequis("Enveloppe compatible", true);
            else
                selecteur.ajoutePrerequis("Enveloppe non compatible", false);

            //Sélection/Déselection de l'intelligence
            if(this._personnage.identite.natureEsprit && this._personnage.identite.natureEsprit.id == idIntelligence)
                selecteur.selectionne();
            selecteur.onclick = (e)=>{
                Selecteur.deselectionneTous(this._listeIntelligences);
                this._personnage.identite.natureEsprit = intelligence;
                for(var i=0; i<this._traitsPersonnage.length; i++)
                {
                    if(this._traitsPersonnage[i].type == Element.TRAIT_ESPRIT)
                    {
                        this._traitsPersonnage.splice(i, 1);
                        break;
                    }
                }
                this._traitsPersonnage.push(new Element(intelligence.id, Element.TRAIT_ESPRIT, nom, 1));
                selecteur.selectionne();
            };

            this._listeIntelligences.appendChild(selecteur.element);
        }
    }

    detruit(){
        super.detruit();
        this._boutonPrecedent.removeEventListener(this._actionBoutonPrecedent);
        this._boutonSuivant.removeEventListener(this._actionBoutonSuivant);
    }
}