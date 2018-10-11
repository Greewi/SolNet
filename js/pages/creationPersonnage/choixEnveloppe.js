import { Page } from "../page";
import { Ecran } from "../../ecrans/ecran";
import { Personnage } from "../../personnages/personnage";
import { BanqueDonnees } from "../../personnages/donneeSources";

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
        this._templateSelecteur = this.element.querySelector("#creationPersonnageSelecteurEnveloppe");

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
            let element = this._templateSelecteur.content.cloneNode(true);
            
            // Nom de l'intelligence
            let nomEnveloppe = element.querySelector(".page__selecteur__ligne_haut");
            nomEnveloppe.innerHTML = enveloppe.nom;

            //Liste des enveloppes compatibles
            let espritCompatible = element.querySelector(".page__selecteur__ligne_bas");
            var estCompatible = false;
            if(this._personnage.identite.natureEsprit)
            for(let idEnveloppeActuelle of this._personnage.identite.natureEsprit.enveloppes)
                if(idEnveloppe==idEnveloppeActuelle)
                    estCompatible = true;
            if(estCompatible)
                espritCompatible.innerHTML = `<span class="page__selecteur__prerequis page__selecteur__prerequis__possede">Esprit compatible</span>`;
            else
                espritCompatible.innerHTML = `<span class="page__selecteur__prerequis">Esprit non compatible</span>`;

            //Sélection/Déselection de l'intelligence
            if(this._personnage.identite.enveloppeUsuelle && this._personnage.identite.enveloppeUsuelle.id == idEnveloppe)
            {
                nomEnveloppe.classList.add("page__selecteur__nom__possede");
                espritCompatible.classList.add("page__selecteur__nom__possede");
            }
            espritCompatible.onclick = nomEnveloppe.onclick = (e)=>{
                var selecteurs = this._listeEnveloppes.querySelectorAll(".page__selecteur__nom__possede");
                for(var selecteur of selecteurs)
                    selecteur.classList.remove("page__selecteur__nom__possede");
                this._personnage.identite.enveloppeUsuelle = enveloppe;
                nomEnveloppe.classList.add("page__selecteur__nom__possede");
                espritCompatible.classList.add("page__selecteur__nom__possede");
            };

            // Block d'infos
            let blockInfos = element.querySelector(".page___selecteur__infos");
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
            blockInfos.innerHTML = `<em>${enveloppe.nom}</em> (depuis ${enveloppe.dateInitiale}) : ${enveloppe.description}.<br/> Modèles : ${listeModeles}. <br/> Esprit compatibles : ${listeEsprits}.`;

            let boutonInfos = element.querySelector(".page___selecteur__bouton_infos");
            boutonInfos.onclick = (e)=>{
                nomEnveloppe.classList.toggle("page__selecteur__nom__ouvert");
                boutonInfos.classList.toggle("page___selecteur__bouton_infos__ouvert");
                blockInfos.classList.toggle("page___selecteur__infos__ouvert");
            };

            this._listeEnveloppes.appendChild(element);
        }
    }

    detruit(){
        super.detruit();
        this._boutonPrecedent.removeEventListener(this._actionBoutonPrecedent);
        this._boutonSuivant.removeEventListener(this._actionBoutonSuivant);
    }
}