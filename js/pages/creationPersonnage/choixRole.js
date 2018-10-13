import { Page } from "../page";
import { Ecran } from "../../ecrans/ecran";
import { Personnage } from "../../personnages/personnage";
import { BanqueDonnees } from "../../personnages/donneeSources";
import { Selecteur } from "./selecteur";

/**
 * Page de choix des rôles du personnage
 */
export class PageChoixRole extends Page{
    /**
     * @param {Ecran} ecran L'écran auquel cette page est rattachée
     * @param {Personnage} personnage Le personnage à créer
     */
    constructor(ecran , personnage){
        super("creationPersonnagePageRoles", ecran);
        this._personnage = personnage;
        this._rolesPersonnage = personnage.roles;

        this._listeRoles = this.element.querySelector("#creationPersonnageRoles");

        this._boutonPrecedent = this.element.querySelector(".bouton-precedent");
        this._actionBoutonPrecedent = (event) => {
            this.ecran.ouvre("introduction", false);
        };
        this._boutonPrecedent.addEventListener("click", this._actionBoutonPrecedent);

        this._boutonSuivant = this.element.querySelector(".bouton-suivant");
        this._actionBoutonSuivant = (event) => {
            this.ecran.ouvre("choixEsprit", true);
        };
        this._boutonSuivant.addEventListener("click", this._actionBoutonSuivant);
    }

    /**
     * @override
     * @inheritdoc
     */
    ouvre(avancer){
        super.ouvre(avancer);
        this._listeRoles.innerHTML = "";
        let roles = BanqueDonnees.roles;
        for(let idRole in roles)
        {
            let role = roles[idRole];    
            let nom = role.nom;
            let description = `<em>${role.nom}</em> : ${role.description}`;
            let selecteur = new Selecteur(nom, description, false);

            //Sélection/Déselection du rôle
            if(this._rolesPersonnage[idRole])
                selecteur.selectionne();
            selecteur.onclick = (e) => {
                if(this._rolesPersonnage[idRole])
                {
                    delete this._rolesPersonnage[idRole];
                    selecteur.deselectionne();
                }
                else
                {
                    this._rolesPersonnage[idRole] = idRole;
                    selecteur.selectionne();
                }
            };

            this._listeRoles.appendChild(selecteur.element);
        }
    }

    detruit(){
        super.detruit();
        this._boutonPrecedent.removeEventListener(this._actionBoutonPrecedent);
        this._boutonSuivant.removeEventListener(this._actionBoutonSuivant);
    }
}