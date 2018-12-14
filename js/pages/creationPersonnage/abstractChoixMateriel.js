import { Page } from "../page";
import { Ecran } from "../../ecrans/ecran";
import { Personnage } from "../../personnages/personnage";
import { BanqueDonnees } from "../../donneeSources";
import { Element } from "../../personnages/element";
import { SelecteurElementSpecial, SelecteurSimple, SelecteurAvecPrerequis } from "../selecteur";
import { Lang } from "../../lang";

/**
 * Page abstraite de choix du matériel du personnage
 */
export class AbstractPageChoixMateriel extends Page{
    /**
     * @param {Ecran} ecran L'écran auquel cette page est rattachée
     * @param {string} template Le nom du template de la page
     * @param {string} module La racine des ids des listes et autres éléments d'interface
     * @param {Personnage} personnage Le personnage à créer
     * @param {[]} listeMaterielPersonnage La liste de matériel du personnage
     * @param {[]} listeMateriel La liste de matériel de référence
     * @param {string} typeMaterielBase Le type du matériel à utiliser.
     * @param {string} typeMaterielCustom Le type du matériel à utiliser.
     * @param {function} filtre Une fonction recevant un matériel en parametre et revoyant vrai si et seulement si le matériel est compatible avec le personnage
     */
    constructor(ecran, template, module, personnage, listeMaterielPersonnage, listeMateriel, typeMaterielBase, typeMaterielCustom, filtre, pagePrecedent, pageSuivante){
        super(template, ecran, pagePrecedent, pageSuivante);
        this._module = module;
        this._typeMaterielBase = typeMaterielBase;
        this._typeMaterielCustom = typeMaterielCustom;
        this._filtre = filtre;
        this._personnage = personnage;
        this._elementsPersonnage = personnage.elements;
        this._rolesPersonnage = personnage.roles;
        this._materielPersonnage = listeMaterielPersonnage;
        this._materielRef = listeMateriel;
        this._carrieresPersonnage = personnage.elements.carrieres;

        this._listeMateriel = this.element.querySelector(`#creationPersonnage${module}s`);
        this._listeMaterielCustom = this.element.querySelector(`#creationPersonnage${module}sCustom`);

        this._boutonAjouterMateriel = this.element.querySelector(`#creationPersonnage${module}sAjouter`);
        this._inputAjouterMateriel = this._boutonAjouterMateriel.querySelector("input");
        this._actionBoutonAjouterMateriel = (event) => {
            event.preventDefault();
            let nom = this._inputAjouterMateriel.value;
            if(nom && nom.trim()!="")
            {
                this._materielPersonnage.push(new Element(null, this._typeMaterielCustom, nom, 1));
                this._ajouteMaterielPersonnalise(nom);
                this._inputAjouterMateriel.blur();
            }
            else if(document.activeElement != this._inputAjouterMateriel)
                this._inputAjouterMateriel.focus();
            else
                this._inputAjouterMateriel.blur();
            this._inputAjouterMateriel.value = "";
        };
        this._boutonAjouterMateriel.addEventListener("submit", this._actionBoutonAjouterMateriel);
    }

    /**
     * @override
     * @inheritdoc
     */
    ouvre(avancer){
        super.ouvre(avancer);
        this._listeMateriel.innerHTML = "";
        this._listeMaterielCustom.innerHTML = "";

        // Materiels personnalisés
        for(let materiel of this._materielPersonnage)
        {
            if(materiel.id == null)
                this._ajouteMaterielPersonnalise(materiel.nom);
        }

        //Filtrage et organisation des materiels standards
        let materielsConseilles = [];
        let materielsUniversels = [];
        let materielsAutres = [];
        for(let idMateriel in this._materielRef)
        {
            let materiel = this._materielRef[idMateriel];
            if(!this._filtre(materiel))
                continue;
            let conseille = false;
            for(let carrierePerso of this._carrieresPersonnage)
            {
                if(!carrierePerso.id)
                    continue;
                let carriere = BanqueDonnees.carrieres[carrierePerso.id];
                for(let idMaterielConseille of carriere.materiel)
                    if(idMateriel == idMaterielConseille)
                        conseille = true;
            }
            if(conseille)
                materielsConseilles.push({materiel:materiel, type:"conseille"});
            else if(materiel.universel)
                materielsUniversels.push({materiel:materiel, type:"universel"});
            else
                materielsAutres.push({materiel:materiel, type:"autre"});
        }
        let materiels = materielsConseilles.concat(materielsUniversels).concat(materielsAutres);

        // Materiels standards
        for(let infoMateriel of materiels)
        {
            let materiel = infoMateriel.materiel;
            let type = infoMateriel.type;
            
            let nom = Lang.get(`${this._module}_${materiel.id}`);
            let description = `<em>${nom}</em> : ${Lang.get(`Description${this._module}_${materiel.id}`)}`;
            let selecteur = new SelecteurAvecPrerequis(nom, description);
            if(type=="conseille")
                selecteur.ajoutePrerequis(Lang.get(`MaterielConseille`), true);
            else if(type=="universel")
                selecteur.ajoutePrerequis(Lang.get(`MaterielUniversel`), true);
           
            //Sélection/Déselection du materiel
            if(this._elementsPersonnage.possedeElement(materiel.id, this._materielPersonnage))
                selecteur.selectionne();
            selecteur.onclick = (e) => {
                if(this._elementsPersonnage.possedeElement(materiel.id, this._materielPersonnage))
                {
                    for(var i=0; i<this._materielPersonnage.length; i++)
                    {
                        if(this._materielPersonnage[i].id == materiel.id)
                        {
                            this._materielPersonnage.splice(i, 1);
                            break;
                        }
                    }
                    selecteur.deselectionne();
                }
                else
                {
                    this._materielPersonnage.push(new Element(materiel.id, this._typeMaterielBase, Lang.get(`${this._module}_${materiel.id}`), 1));
                    selecteur.selectionne();
                }
            };

            this._listeMateriel.appendChild(selecteur.element);
        }
    }

    _ajouteMaterielPersonnalise(nom){
        let selecteur = new SelecteurElementSpecial(nom);
        selecteur.selectionne();
        selecteur.onsupprime = ()=>{
            for(var i=0; i<this._materielPersonnage.length; i++)
            {
                if(this._materielPersonnage[i].nom == nom)
                {
                    this._materielPersonnage.splice(i, 1);
                    break;
                }
            }
            selecteur.element.remove();
        };
        this._listeMaterielCustom.appendChild(selecteur.element);
    }

    detruit(){
        super.detruit();
        this._boutonAjouterMateriel.removeEventListener(this._actionBoutonAjouterMateriel);
    }
}