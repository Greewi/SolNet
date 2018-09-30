import { Page } from "../page";
import { Ecran } from "../../ecrans/ecran";
import { Personnage } from "../../personnages/personnage";
import { BanqueDonnees } from "../../personnages/donneeSources";

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
        this._rolesPersonnage = personnage.identite.roles;

        this._listeRoles = this.element.querySelector("#creationPersonnageRoles");
        this._templateSelecteurRole = this.element.querySelector("#creationPersonnageSelecteurRoles");

        this._boutonPrecedent = this.element.querySelector(".bouton-precedent");
        this._actionBoutonPrecedent = (event) => {
            this.ecran.ouvre("introduction", false);
        };
        this._boutonPrecedent.addEventListener("click", this._actionBoutonPrecedent);

        this._boutonSuivant = this.element.querySelector(".bouton-suivant");
        this._actionBoutonSuivant = (event) => {
            this.ecran.ouvre("identite", true);
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
            let element = this._templateSelecteurRole.content.cloneNode(true);
            
            let nomRole = element.querySelector(".page_creation__selecteur_role__nom_role");
            nomRole.innerHTML = role.nom;
            if(this._rolesPersonnage[idRole])
                nomRole.classList.add("page_creation__selecteur_role__nom_role__possede");
            nomRole.onclick = (e)=>{
                if(this._rolesPersonnage[idRole])
                {
                    delete this._rolesPersonnage[idRole];
                    nomRole.classList.remove("page_creation__selecteur_role__nom_role__possede");
                }
                else
                {
                    this._rolesPersonnage[idRole] = idRole;
                    nomRole.classList.add("page_creation__selecteur_role__nom_role__possede");
                }
            };

            let blockInfos = element.querySelector(".page_creation__selecteur_role__infos_role");
            blockInfos.innerHTML = `<em>${role.nom}</em> : ${role.description}`;

            let boutonInfos = element.querySelector(".page_creation__selecteur_role__bouton_infos");
            boutonInfos.onclick = (e)=>{
                nomRole.classList.toggle("page_creation__selecteur_role__nom_role__ouvert");
                boutonInfos.classList.toggle("page_creation__selecteur_role__bouton_infos__ouvert");
                blockInfos.classList.toggle("page_creation__selecteur_role__infos_role__ouvert");
            };

            this._listeRoles.appendChild(element);
        }
    }

    detruit(){
        super.detruit();
        this._boutonPrecedent.removeEventListener(this._actionBoutonPrecedent);
        this._boutonSuivant.removeEventListener(this._actionBoutonSuivant);
    }
}