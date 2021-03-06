import { Page } from "../page";
import { Ecran } from "../../ecrans/ecran";
import { Personnage } from "../../personnages/personnage";
import { BibliothequeDonnees } from "../../ressources/donneeSources";
import { Element } from "../../personnages/element";
import { Selecteur, SelecteurAvecPrerequis, SelecteurElementSpecial } from "../../ui/selecteur";
import { Lang } from "../../lang";

/**
 * Page de choix des carrières du personnage
 */
export class PageChoixCarrieres extends Page{
    /**
     * @param {Ecran} ecran L'écran auquel cette page est rattachée
     * @param {Personnage} personnage Le personnage à créer
     */
    constructor(ecran , personnage){
        super("pageCreationPersonnageCarrieres", ecran);

        this._personnage = personnage;
        this._rolesPersonnage = personnage.roles;
        this._elementsPersonnage = personnage.elements;
        this._carrieresPersonnage = personnage.elements.carrieres;

        this._listeCarrieres = this.element.querySelector("#creationPersonnageCarrieres");
        this._listeCarrieresCustom = this.element.querySelector("#creationPersonnageCarrieresCustom");

        this._boutonAjouterCarriere = this.element.querySelector("#creationPersonnageCarrieresAjouter");
        this._inputAjouterCarriere = this._boutonAjouterCarriere.querySelector("input");
        this._actionBoutonAjouterCarriere = (event) => {
            event.preventDefault();
            let nom = this._inputAjouterCarriere.value;
            if(nom && nom.trim()!="")
            {
                this._carrieresPersonnage.push(new Element(null, Element.CARRIERE_PERSO, nom, 1));
                this._ajouteCarrierePersonnalisee(nom);
                this._inputAjouterCarriere.blur();
            }
            else if(document.activeElement != this._inputAjouterCarriere)
                this._inputAjouterCarriere.focus();
            else
                this._inputAjouterCarriere.blur();
            this._inputAjouterCarriere.value = "";
        };
        this._boutonAjouterCarriere.addEventListener("submit", this._actionBoutonAjouterCarriere);
    }

    /**
     * @override
     * @inheritdoc
     */
    ouvre(animation){
        super.ouvre(animation);
        this._listeCarrieres.innerHTML = "";
        this._listeCarrieresCustom.innerHTML = "";

        let roles = BibliothequeDonnees.roles;

        // On ordonne les carrières en mettant celles qui remplissent le mieux les rôles du personnage en premier.
        let carrieresRolesComplet = [];
        let carrieresRolesPartiel = [];
        let carrieresRolesAucun = [];
        for(let idCarriere in BibliothequeDonnees.carrieres)
        {
            let carriere = BibliothequeDonnees.carrieres[idCarriere];
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
            let nom = Lang.get(`Carriere_${carriere.id}`);
            let description = `<em>${nom}</em> : ${Lang.get(`DescriptionCarriere_${carriere.id}`)}`;
            let selecteur = new SelecteurAvecPrerequis(nom, description);

            //Liste des rôles de la carrière
            for(let idRole of carriere.roles)
                selecteur.ajoutePrerequis(Lang.get(`Role_${idRole}`), this._rolesPersonnage[idRole]? true : false);

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
                    this._carrieresPersonnage.push(new Element(carriere.id, Element.CARRIERE_BASE, Lang.get(`Carriere_${carriere.id}`), 1));
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
                if(this._carrieresPersonnage[i].nom == nom)
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
        this._boutonAjouterCarriere.removeEventListener("submit", this._actionBoutonAjouterCarriere);
    }
}