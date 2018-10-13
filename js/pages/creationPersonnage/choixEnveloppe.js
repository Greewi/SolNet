import { Page } from "../page";
import { Ecran } from "../../ecrans/ecran";
import { Personnage } from "../../personnages/personnage";
import { BanqueDonnees } from "../../personnages/donneeSources";
import { Selecteur, SelecteurAvecPrerequis } from "./selecteur";

/**
 * Page de choix de l'enveloppe usuelle du personnage
 */
export class PageChoixEnveloppe extends Page{
    /**
     * @param {Ecran} ecran L'écran auquel cette page est rattachée
     * @param {Personnage} personnage Le personnage à créer
     */
    constructor(ecran , personnage){
        super("creationPersonnagePageEnveloppe", ecran);
        this._personnage = personnage;
        this._rolesPersonnage = personnage.roles;

        this._listeEnveloppes = this.element.querySelector("#creationPersonnageEnveloppe");

        this._boutonPrecedent = this.element.querySelector(".bouton-precedent");
        this._actionBoutonPrecedent = (event) => {
            this.ecran.ouvre("choixEsprit", false);
        };
        this._boutonPrecedent.addEventListener("click", this._actionBoutonPrecedent);

        this._boutonSuivant = this.element.querySelector(".bouton-suivant");
        this._actionBoutonSuivant = (event) => {
            this.ecran.ouvre("choixCarriere", true);
        };
        this._boutonSuivant.addEventListener("click", this._actionBoutonSuivant);
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
            let nom = enveloppe.nom;
            var listeEsprits = "";
            for(let idIntelligence in intelligences)
            {
                let intelligence = intelligences[idIntelligence];
                for(let idEnveloppe of intelligence.enveloppes)
                {
                    if(idEnveloppe == enveloppe.id)
                    {
                        if(listeEsprits=="")
                            listeEsprits = `<em>${intelligence.nom}</em>`;
                        else
                            listeEsprits+=`, <em>${intelligence.nom}</em>`;
                    }
                }
            }
            var listeModeles = "";
            for(let modele of enveloppe.modeles)
                if(listeModeles=="")
                    listeModeles = `<em>${modele}</em>`;
                else
                    listeModeles+=`, <em>${modele}</em>`;
                    let description = `<em>${enveloppe.nom}</em> (depuis ${enveloppe.dateInitiale}) : ${enveloppe.description}.<br/> Modèles : ${listeModeles}. <br/> Esprit compatibles : ${listeEsprits}.`;
            let selecteur = new SelecteurAvecPrerequis(nom, description);

            //Liste des enveloppes compatibles
            var estCompatible = false;
            if(this._personnage.identite.natureEsprit)
            for(let idEnveloppeActuelle of this._personnage.identite.natureEsprit.enveloppes)
                if(idEnveloppe==idEnveloppeActuelle)
                    estCompatible = true;
            if(estCompatible)
                selecteur.ajoutePrerequis("Esprit compatible", true);
            else
                selecteur.ajoutePrerequis("Esprit non compatible", false);
            
            //Sélection/Déselection de l'enveloppe
            if(this._personnage.identite.enveloppeUsuelle && this._personnage.identite.enveloppeUsuelle.id == idEnveloppe)
                selecteur.selectionne();
            selecteur.onclick = (e)=>{
                Selecteur.deselectionneTous(this._listeEnveloppes);
                this._personnage.identite.enveloppeUsuelle = enveloppe;
                selecteur.selectionne();
            };
            
            this._listeEnveloppes.appendChild(selecteur.element);
        }
    }

    detruit(){
        super.detruit();
        this._boutonPrecedent.removeEventListener(this._actionBoutonPrecedent);
        this._boutonSuivant.removeEventListener(this._actionBoutonSuivant);
    }
}