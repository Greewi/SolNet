import { Page } from "../page";
import { Ecran } from "../../ecrans/ecran";
import { Personnage } from "../../personnages/personnage";
import { BanqueDonnees } from "../../personnages/donneeSources";
import { Element } from "../../personnages/element";
import { SelecteurElementSpecial, SelecteurSimple } from "./selecteur";
import { Lang } from "../../lang";

/**
 * Page de choix de l'équipement du personnage
 */
export class PageChoixEquipements extends Page{
    /**
     * @param {Ecran} ecran L'écran auquel cette page est rattachée
     * @param {Personnage} personnage Le personnage à créer
     */
    constructor(ecran , personnage, pagePrecedent, pageSuivante){
        super("creationPersonnagePageEquipements", ecran, pagePrecedent, pageSuivante);

        this._personnage = personnage;
        this._rolesPersonnage = personnage.roles;
        this._elementsPersonnage = personnage.elements;
        this._equipementsPersonnage = personnage.elements.equipements;

        this._listeEquipements = this.element.querySelector("#creationPersonnageEquipements");
        this._listeEquipementsCustom = this.element.querySelector("#creationPersonnageEquipementsCustom");

        this._boutonAjouterEquipement = this.element.querySelector("#creationPersonnageEquipementsAjouter");
        this._inputAjouterEquipement = this._boutonAjouterEquipement.querySelector("input");
        this._actionBoutonAjouterEquipement = (event) => {
            event.preventDefault();
            let nom = this._inputAjouterEquipement.value;
            if(nom && nom.trim()!="")
            {
                this._equipementsPersonnage.push(new Element(null, Element.EQUIPEMENT_PERSO, nom, 1));
                this._ajouteEquipementPersonnalise(nom);
                this._inputAjouterEquipement.blur();
            }
            else if(document.activeElement != this._inputAjouterEquipement)
                this._inputAjouterEquipement.focus();
            else
                this._inputAjouterEquipement.blur();
            this._inputAjouterEquipement.value = "";
            this.scrollEnBas();    
        };
        this._boutonAjouterEquipement.addEventListener("submit", this._actionBoutonAjouterEquipement);
    }

    /**
     * @override
     * @inheritdoc
     */
    ouvre(avancer){
        super.ouvre(avancer);
        this._listeEquipements.innerHTML = "";
        this._listeEquipementsCustom.innerHTML = "";

        // Carrières personnalisées
        for(let equipement of this._equipementsPersonnage)
        {
            if(equipement.id == null)
                this._ajouteEquipementPersonnalise(equipement.nom);
        }

        // Carrières standardes
        for(let idEquipement in BanqueDonnees.equipements)
        {
            let equipement = BanqueDonnees.equipements[idEquipement];

            let nom = Lang.get(`Equipement_${equipement.id}`);
            let description = `<em>${nom}</em> : ${Lang.get(`DescriptionEquipement_${equipement.id}`)}`;
            let selecteur = new SelecteurSimple(nom, description);

            //Sélection/Déselection de la carrière
            if(this._elementsPersonnage.possedeEquipement(equipement.id))
                selecteur.selectionne();
            selecteur.onclick = (e) => {
                if(this._elementsPersonnage.possedeEquipement(equipement.id))
                {
                    for(var i=0; i<this._equipementsPersonnage.length; i++)
                    {
                        if(this._equipementsPersonnage[i].id == equipement.id)
                        {
                            this._equipementsPersonnage.splice(i, 1);
                            break;
                        }
                    }
                    selecteur.deselectionne();
                }
                else
                {
                    this._equipementsPersonnage.push(new Element(equipement.id, Element.EQUIPEMENT_BASE, Lang.get(`Equipement_${equipement.id}`), 1));
                    selecteur.selectionne();
                }
            };

            this._listeEquipements.appendChild(selecteur.element);
        }
    }

    _ajouteEquipementPersonnalise(nom){
        let selecteur = new SelecteurElementSpecial(nom);
        selecteur.selectionne();
        selecteur.onsupprime = ()=>{
            for(var i=0; i<this._equipementsPersonnage.length; i++)
            {
                if(this._equipementsPersonnage[i].nom == nom)
                {
                    this._equipementsPersonnage.splice(i, 1);
                    break;
                }
            }
            selecteur.element.remove();
        };
        this._listeEquipementsCustom.appendChild(selecteur.element);
    }

    detruit(){
        super.detruit();
        this._boutonAjouterEquipement.removeEventListener(this._actionBoutonAjouterEquipement);
    }
}