import { Page } from "../page";
import { Ecran } from "../../ecrans/ecran";
import { Personnage } from "../../personnages/personnage";
import { BanqueDonnees } from "../../personnages/donneeSources";

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

        this._listeIntelligences = this.element.querySelector("#creationPersonnageEsprit");
        this._templateSelecteurRole = this.element.querySelector("#creationPersonnageSelecteurEsprit");

        this._boutonPrecedent = this.element.querySelector(".bouton-precedent");
        this._actionBoutonPrecedent = (event) => {
            this.ecran.ouvre("choixRole", false);
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
        this._listeIntelligences.innerHTML = "";
        let intelligences = BanqueDonnees.intelligences;
        let enveloppes = BanqueDonnees.enveloppes;
        for(let idIntelligence in intelligences)
        {
            let intelligence = intelligences[idIntelligence];
            let element = this._templateSelecteurRole.content.cloneNode(true);
            
            // Nom de l'intelligence
            let nomIntelligence = element.querySelector(".page__selecteur__ligne_haut");
            nomIntelligence.innerHTML = intelligence.nom;

            //Liste des enveloppes compatibles
            let enveloppesCompatibles = element.querySelector(".page__selecteur__ligne_bas");
            var listeEnveloppes = "";
            for(let idEnveloppe of intelligence.enveloppes)
            {
                let enveloppe = enveloppes[idEnveloppe];
                let classe = "page__selecteur__prerequis page__selecteur__prerequis__possede";
                listeEnveloppes+=`<span class="${classe}">${enveloppe.nom}</span>`;
            }//TODO mettre "Enveloppe compatible/Non Compatible"
            enveloppesCompatibles.innerHTML = `<span class="${classe}">${enveloppe.nom}</span>`;

            //Sélection/Déselection de l'intelligence
            if(this._personnage.identite.natureEsprit && this._personnage.identite.natureEsprit.id == idIntelligence)
            {
                nomIntelligence.classList.add("page__selecteur__nom__possede");
                enveloppesCompatibles.classList.add("page__selecteur__nom__possede");
            }
            enveloppesCompatibles.onclick = nomIntelligence.onclick = (e)=>{
                var selecteurs = this._listeIntelligences.querySelectorAll(".page__selecteur__nom__possede");
                for(var selecteur of selecteurs)
                    selecteur.classList.remove("page__selecteur__nom__possede");
                this._personnage.identite.natureEsprit = intelligence;
                nomIntelligence.classList.add("page__selecteur__nom__possede");
                enveloppesCompatibles.classList.add("page__selecteur__nom__possede");
            };

            // Block d'infos
            let blockInfos = element.querySelector(".page___selecteur__infos");
            var listeEnveloppes = "";
            for(let idEnveloppe of intelligence.enveloppes)
            {
                let enveloppe = enveloppes[idEnveloppe];
                if(listeEnveloppes=="")
                    listeEnveloppes = `<em>${enveloppe.nom}</em>`;
                else
                    listeEnveloppes+=`, <em>${enveloppe.nom}</em>`;
            }
            blockInfos.innerHTML = `<em>${intelligence.nom}</em> (depuis ${intelligence.dateInitiale}) : ${intelligence.description}.<br/> Enveloppes compatibles : ${listeEnveloppes}.`;

            let boutonInfos = element.querySelector(".page___selecteur__bouton_infos");
            boutonInfos.onclick = (e)=>{
                nomIntelligence.classList.toggle("page__selecteur__nom__ouvert");
                boutonInfos.classList.toggle("page___selecteur__bouton_infos__ouvert");
                blockInfos.classList.toggle("page___selecteur__infos__ouvert");
            };

            this._listeIntelligences.appendChild(element);
        }
    }

    detruit(){
        super.detruit();
        this._boutonPrecedent.removeEventListener(this._actionBoutonPrecedent);
        this._boutonSuivant.removeEventListener(this._actionBoutonSuivant);
    }
}