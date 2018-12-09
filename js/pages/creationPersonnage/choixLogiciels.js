import { Page } from "../page";
import { Ecran } from "../../ecrans/ecran";
import { Personnage } from "../../personnages/personnage";
import { BanqueDonnees } from "../../donneeSources";
import { Element } from "../../personnages/element";
import { SelecteurElementSpecial, SelecteurSimple } from "./selecteur";
import { Lang } from "../../lang";

/**
 * Page de choix des logiciels du personnage
 */
export class PageChoixLogiciels extends Page{
    /**
     * @param {Ecran} ecran L'écran auquel cette page est rattachée
     * @param {Personnage} personnage Le personnage à créer
     */
    constructor(ecran , personnage, pagePrecedent, pageSuivante){
        super("pageCreationPersonnageLogiciels", ecran, pagePrecedent, pageSuivante);

        this._personnage = personnage;
        this._rolesPersonnage = personnage.roles;
        this._elementsPersonnage = personnage.elements;
        this._logicielsPersonnage = personnage.elements.logiciels;

        this._listeLogiciels = this.element.querySelector("#creationPersonnageLogiciels");
        this._listeLogicielsCustom = this.element.querySelector("#creationPersonnageLogicielsCustom");

        this._boutonAjouterLogiciel = this.element.querySelector("#creationPersonnageLogicielsAjouter");
        this._inputAjouterLogiciel = this._boutonAjouterLogiciel.querySelector("input");
        this._actionBoutonAjouterLogiciel = (event) => {
            event.preventDefault();
            let nom = this._inputAjouterLogiciel.value;
            if(nom && nom.trim()!="")
            {
                this._logicielsPersonnage.push(new Element(null, Element.LOGICIEL_PERSO, nom, 1));
                this._ajouteLogicielPersonnalise(nom);
                this._inputAjouterLogiciel.blur();
            }
            else if(document.activeElement != this._inputAjouterLogiciel)
                this._inputAjouterLogiciel.focus();
            else
                this._inputAjouterLogiciel.blur();
            this._inputAjouterLogiciel.value = "";
            this.scrollEnBas();    
        };
        this._boutonAjouterLogiciel.addEventListener("submit", this._actionBoutonAjouterLogiciel);
    }

    /**
     * @override
     * @inheritdoc
     */
    ouvre(avancer){
        super.ouvre(avancer);
        this._listeLogiciels.innerHTML = "";
        this._listeLogicielsCustom.innerHTML = "";

        // Carrières personnalisées
        for(let logiciel of this._logicielsPersonnage)
        {
            if(logiciel.id == null)
                this._ajouteLogicielPersonnalise(logiciel.nom);
        }

        // Carrières standardes
        for(let idLogiciel in BanqueDonnees.logiciels)
        {
            let logiciel = BanqueDonnees.logiciels[idLogiciel];

            let nom = Lang.get(`Logiciel_${logiciel.id}`);
            let description = `<em>${nom}</em> : ${Lang.get(`DescriptionLogiciel_${logiciel.id}`)}`;
            let selecteur = new SelecteurSimple(nom, description);

            //Sélection/Déselection de la carrière
            if(this._elementsPersonnage.possedeLogiciel(logiciel.id))
                selecteur.selectionne();
            selecteur.onclick = (e) => {
                if(this._elementsPersonnage.possedeLogiciel(logiciel.id))
                {
                    for(var i=0; i<this._logicielsPersonnage.length; i++)
                    {
                        if(this._logicielsPersonnage[i].id == logiciel.id)
                        {
                            this._logicielsPersonnage.splice(i, 1);
                            break;
                        }
                    }
                    selecteur.deselectionne();
                }
                else
                {
                    this._logicielsPersonnage.push(new Element(logiciel.id, Element.LOGICIEL_BASE, Lang.get(`Logiciel_${logiciel.id}`), 1));
                    selecteur.selectionne();
                }
            };

            this._listeLogiciels.appendChild(selecteur.element);
        }
    }

    _ajouteLogicielPersonnalise(nom){
        let selecteur = new SelecteurElementSpecial(nom);
        selecteur.selectionne();
        selecteur.onsupprime = ()=>{
            for(var i=0; i<this._logicielsPersonnage.length; i++)
            {
                if(this._logicielsPersonnage[i].nom == nom)
                {
                    this._logicielsPersonnage.splice(i, 1);
                    break;
                }
            }
            selecteur.element.remove();
        };
        this._listeLogicielsCustom.appendChild(selecteur.element);
    }

    detruit(){
        super.detruit();
        this._boutonAjouterLogiciel.removeEventListener(this._actionBoutonAjouterLogiciel);
    }
}