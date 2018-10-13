import { Page } from "../page";
import { Ecran } from "../../ecrans/ecran";
import { Personnage } from "../../personnages/personnage";
import { BanqueDonnees } from "../../personnages/donneeSources";
import { Element } from "../../personnages/element";
import { Selecteur, SelecteurAvecPrerequis, SelecteurElementSpecial } from "./selecteur";

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
        this._listeCarrieresCustom = this.element.querySelector("#creationPersonnageCarrieresCustom");

        this._boutonAjouterCarriere = this.element.querySelector(".bouton-ajouter-carriere");
        this._actionBoutonAjouterCarriere = (event) => {
            let nom = prompt("Nom de la carrière ?");
            if(nom && nom.trim()!="")
            {
                this._carrieresPersonnage.push(new Element(null, nom, 1));
                this._ajouteCarrierePersonnalisee(nom);
            }
            this.scrollEnBas();    
        };
        this._boutonAjouterCarriere.addEventListener("click", this._actionBoutonAjouterCarriere);

        this._boutonPrecedent = this.element.querySelector(".bouton-precedent");
        this._actionBoutonPrecedent = (event) => {
            this.ecran.ouvre("choixEnveloppe", false);
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
        this._listeCarrieresCustom.innerHTML = "";

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

        // Carrières personnalisées
        for(let carriere of this._carrieresPersonnage)
        {
            if(carriere.id == null)
                this._ajouteCarrierePersonnalisee(carriere.nom);
        }

        // Carrières standardes
        for(let carriere of carrieres)
        {
            let nom = carriere.nom;
            let description = `<em>${carriere.nom}</em> : ${carriere.description}`;
            let selecteur = new SelecteurAvecPrerequis(nom, description);

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
                    {
                        if(this._carrieresPersonnage[i].id == carriere.id)
                        {
                            this._carrieresPersonnage.splice(i, 1);
                            break;
                        }
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

    _ajouteCarrierePersonnalisee(nom){
        let selecteur = new SelecteurElementSpecial(nom);
        selecteur.selectionne();
        selecteur.onsupprime = ()=>{
            for(var i=0; i<this._carrieresPersonnage.length; i++)
            {
                if(this._carrieresPersonnage[i].num = nom)
                {
                    this._carrieresPersonnage.splice(i, 1);
                    break;
                }
            }
            selecteur.element.remove();
        };
        this._listeCarrieresCustom.appendChild(selecteur.element);
    }

    detruit(){
        super.detruit();
        this._boutonPrecedent.removeEventListener(this._actionBoutonPrecedent);
        this._boutonSuivant.removeEventListener(this._actionBoutonSuivant);
        this._boutonAjouterCarriere.removeEventListener(this._actionBoutonAjouterCarriere);
    }
}