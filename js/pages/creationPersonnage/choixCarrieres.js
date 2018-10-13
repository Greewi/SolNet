import { Page } from "../page";
import { Ecran } from "../../ecrans/ecran";
import { Personnage } from "../../personnages/personnage";
import { BanqueDonnees } from "../../personnages/donneeSources";
import { Element } from "../../personnages/element";
import { Selecteur } from "./selecteur";

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

        this._boutonPrecedent = this.element.querySelector(".bouton-precedent");
        this._actionBoutonPrecedent = (event) => {
            this.ecran.ouvre("choixEsprit", false);
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
            let nom = carriere.nom;
            let description = `<em>${carriere.nom}</em> : ${carriere.description}`;
            let selecteur = new Selecteur(nom, description, true);

            //Liste des rôles de la carrière
            var listeRoles = "";
            for(let idRole of carriere.roles)
            {
                let role = roles[idRole];
                selecteur.ajoutePrerequis(role.nom, this._rolesPersonnage[idRole]? true : false);
            }

            //Sélection/Déselection de la carrière
            if(this._elementsPersonnage.possedeCarriere(carriere.id))
                selecteur.selectionne();
            selecteur.onclick = (e) => {
                if(this._elementsPersonnage.possedeCarriere(carriere.id))
                {
                    for(var i=0; i<this._carrieresPersonnage.length; i++)
                    if(this._carrieresPersonnage[i].id = carriere.id)
                    {
                        this._carrieresPersonnage.splice(i, 1);
                        break;
                    }
                    selecteur.deselectionne();
                }
                else
                {
                    this._carrieresPersonnage.push(new Element(carriere.id, carriere.nom, 1));
                    selecteur.selectionne();
                }
            };

            this._listeCarrieres.appendChild(selecteur.element);
        }
    }

    detruit(){
        super.detruit();
        this._boutonPrecedent.removeEventListener(this._actionBoutonPrecedent);
        this._boutonSuivant.removeEventListener(this._actionBoutonSuivant);
    }
}