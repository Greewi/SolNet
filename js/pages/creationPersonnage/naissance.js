import { Page } from "../page";
import { SelecteurTextArea, SelecteurInputDate, SelecteurInputText } from "../selecteur";
import { Lang } from "../../lang";
import { Personnage } from "../../personnages/personnage";
import { BibliothequeDonnees } from "../../ressources/donneeSources";

export class PageNaissance extends Page{
    /**
     * @param {Ecran} ecran L'écran auquel cette page est rattachée
     * @param {Personnage} personnage Le personnage à créer
     */
    constructor(ecran, personnage){
        super("pageCreationPersonnageNaissance", ecran);
        this._factions = BibliothequeDonnees.factions

        this._personnage = personnage;
        this._elementDate = this.element.querySelector("#creationPersonnageDateNaissance");
        this._elementDatesUtiles = this.element.querySelector("#creationPersonnageContrainteDatesNaissance");
        this._elementLieu = this.element.querySelector("#creationPersonnageLieuNaissance");
        this._elementDetails = this.element.querySelector("#creationPersonnageDetailsNaissance");
    }

    /**
     * @override
     * @inheritdoc
     */
    ouvre(animation){
        super.ouvre(animation);

        let datesUtiles = [];
        if(this._personnage.identite.enveloppeUsuelle){
            datesUtiles.push({
                "date" : BibliothequeDonnees.enveloppes[this._personnage.identite.enveloppeUsuelle.id].dateInitiale,
                 "texte" : Lang.get(`Enveloppe_${this._personnage.identite.enveloppeUsuelle.id}`)
            });
        }
        if(this._personnage.identite.natureEsprit){
            datesUtiles.push({
                "date" : BibliothequeDonnees.intelligences[this._personnage.identite.natureEsprit.id].dateInitiale,
                "texte" : Lang.get(`Intelligence_${this._personnage.identite.natureEsprit.id}`)
            });
        }
        for(let relation of this._personnage.elements.relations){
            if(relation.id!=null){
                datesUtiles.push({
                    "date" : BibliothequeDonnees.factions[relation.id].dateInitiale,
                    "texte" : Lang.get(`Faction_${relation.id}`)
                });
            }
        }
        datesUtiles.sort((a, b)=>{
            return a.date - b.date;
        });
        let listeDates = "<ul>";
        for(let date of datesUtiles)
            listeDates += `<li><em>${date.date} :</em> ${date.texte}</li>`;
        listeDates+="</ul>";

        this._elementDatesUtiles.innerHTML = listeDates;

        this._elementDate.innerHTML = "";
        this._selecteurDate = new SelecteurInputDate(Lang.get("DescriptionDateNaissance"));
        this._selecteurDate.valeur = this._personnage.histoire.dateNaissance;
        this._selecteurDate.min = "1980-01-01";
        this._selecteurDate.max = "2092-12-31";
        this._selecteurDate.onchange = (valeur)=>{
            this._personnage.histoire.dateNaissance = valeur;
        };
        this._elementDate.appendChild(this._selecteurDate.element);

        this._elementLieu.innerHTML = "";
        this._selecteurLieu = new SelecteurInputText(Lang.get("InputLieuNaissance"), Lang.get("DescriptionLieuNaissance"));
        this._selecteurLieu.valeur = this._personnage.histoire.lieuNaissance;
        this._selecteurLieu.onchange = (valeur)=>{
            this._personnage.histoire.lieuNaissance = valeur;
        };
        this._elementLieu.appendChild(this._selecteurLieu.element);
        
        this._elementDetails.innerHTML = "";
        this._selecteurDetails = new SelecteurTextArea(Lang.get("InputLieuNaissance"), 4);
        this._selecteurDetails.valeur = this._personnage.histoire.detailNaissance;
        this._selecteurDetails.onchange = (valeur)=>{
            this._personnage.histoire.detailNaissance = valeur;
        };
        this._elementDetails.appendChild(this._selecteurDetails.element);
    }

    detruit(){
        super.detruit();
    }
}
