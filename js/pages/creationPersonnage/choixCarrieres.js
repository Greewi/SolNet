import { Page } from "../page";
import { Ecran } from "../../ecrans/ecran";
import { Personnage } from "../../personnages/personnage";
import { BanqueDonnees } from "../../personnages/donneeSources";
import { Element } from "../../personnages/element";

/**
 * Page de choix des rôles du personnage
 */
export class PageChoixCarrieres extends Page{
    /**
     * @param {Ecran} ecran L'écran auquel cette page est rattachée
     * @param {Personnage} personnage Le personnage à créer
     */
    constructor(ecran , personnage){
        super("creationPersonnagePageCarriere", ecran);

        this._personnage = personnage;
        this._rolesPersonnage = personnage.roles;
        this._elementsPersonnage = personnage.elements;
        this._carrieresPersonnage = personnage.elements.carrieres;

        this._listeCarrieres = this.element.querySelector("#creationPersonnageCarrieres");
        this._templateSelecteurCarrieres = this.element.querySelector("#creationPersonnageSelecteurCarrieres");

        this._boutonPrecedent = this.element.querySelector(".bouton-precedent");
        this._actionBoutonPrecedent = (event) => {
            this.ecran.ouvre("choixRole", false);
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
        this._listeCarrieres.innerHTML = "";

        let roles = BanqueDonnees.roles;

        // On ordonne les carrières en mettant celles qui remplissent le mieux les rôles du personnage en premier.
        let carrieresRolesComplet = [];
        let carrieresRolesPartiel = [];
        let carrieresRolesAucun = [];
        for(let idCarriere in BanqueDonnees.carrieres)
        {
            let carriere = BanqueDonnees.carrieres[idCarriere];
            let possedeRoleOk=false;
            let possedeRolePasOk=false;
            for(let role of carriere.roles)
                if(this._rolesPersonnage[role])
                    possedeRoleOk = true;
                else
                    possedeRolePasOk = true;
            if(possedeRoleOk && !possedeRolePasOk)
                carrieresRolesComplet.push(carriere);
            else if(possedeRoleOk)
                carrieresRolesPartiel.push(carriere);
            else
                carrieresRolesAucun.push(carriere);
        }
        let carrieres = carrieresRolesComplet.concat(carrieresRolesPartiel).concat(carrieresRolesAucun);

        for(let carriere of carrieres)
        {
            let element = this._templateSelecteurCarrieres.content.cloneNode(true);

            //Nom de la carrière
            let nomCarriere = element.querySelector(".creation_perso__selecteur_carriere__nom_carriere");
            nomCarriere.innerHTML = carriere.nom;

            //Liste des rôles de la carrière
            let rolesCarriere = element.querySelector(".creation_perso__selecteur_carriere__roles_carriere");
            var listeRoles = "";
            for(let idRole of carriere.roles)
            {
                let role = roles[idRole];
                let classe = "creation_perso__selecteur_carriere__roles_carriere__role";
                if(this._rolesPersonnage[idRole])
                    classe = "creation_perso__selecteur_carriere__roles_carriere__role creation_perso__selecteur_carriere__roles_carriere__role_possede";
                listeRoles+=`<span class="${classe}">${role.nom}</span>`;
            }
            rolesCarriere.innerHTML = listeRoles;

            //Sélection/Déselection de la carrière
            if(this._elementsPersonnage.possedeCarriere(carriere.id))
            {
                nomCarriere.classList.add("creation_perso__selecteur_carriere__nom_carriere__possede");
                rolesCarriere.classList.add("creation_perso__selecteur_carriere__roles_carriere__possede");
            }            
            rolesCarriere.onclick = nomCarriere.onclick = (e)=>{
                if(this._elementsPersonnage.possedeCarriere(carriere.id))
                {
                    for(var i=0; i<this._carrieresPersonnage.length; i++)
                        if(this._carrieresPersonnage[i].id = carriere.id)
                        {
                            this._carrieresPersonnage.splice(i, 1);
                            break;
                        }
                    nomCarriere.classList.remove("creation_perso__selecteur_carriere__nom_carriere__possede");
                    rolesCarriere.classList.remove("creation_perso__selecteur_carriere__roles_carriere__possede");
                }
                else
                {
                    this._carrieresPersonnage.push(new Element(carriere.id, carriere.nom, 1));
                    nomCarriere.classList.add("creation_perso__selecteur_carriere__nom_carriere__possede");
                    rolesCarriere.classList.add("creation_perso__selecteur_carriere__roles_carriere__possede");
                }
            };

            // Block d'infos
            let blockInfos = element.querySelector(".creation_perso__selecteur_carriere__infos_carriere");
            blockInfos.innerHTML = `<em>${carriere.nom}</em> : ${carriere.description}`;

            let boutonInfos = element.querySelector(".creation_perso__selecteur_carriere__bouton_infos");
            boutonInfos.onclick = (e)=>{
                rolesCarriere.classList.toggle("creation_perso__selecteur_carriere__roles_carriere__ouvert");
                boutonInfos.classList.toggle("creation_perso__selecteur_carriere__bouton_infos__ouvert");
                blockInfos.classList.toggle("creation_perso__selecteur_carriere__infos_carriere__ouvert");
            };

            this._listeCarrieres.appendChild(element);
        }
    }

    detruit(){
        super.detruit();
        this._boutonPrecedent.removeEventListener(this._actionBoutonPrecedent);
        this._boutonSuivant.removeEventListener(this._actionBoutonSuivant);
    }
}