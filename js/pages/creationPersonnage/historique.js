import { Page } from "../page";
import { SelecteurPeriodeCarriere } from "../../ui/selecteur";
import { Lang } from "../../lang";
import { Personnage } from "../../personnages/personnage";
import { BibliothequeDonnees } from "../../ressources/donneeSources";
import { PeriodeHistorique } from "../../personnages/histoire";
import { PopupConfirmation, PopupSelect } from "../../ui/popup";

export class PageHistorique extends Page{
    /**
     * @param {Ecran} ecran L'écran auquel cette page est rattachée
     * @param {Personnage} personnage Le personnage à créer
     */
    constructor(ecran, personnage){
        super("pageCreationPersonnageHistorique", ecran);
        this._factions = BibliothequeDonnees.factions
        this._personnage = personnage;
        this._elementDatesUtiles = this.element.querySelector("#creationPersonnageContrainteDatesHistorique");
        this._elementAjouterDebut = this.element.querySelector("#creationPersonnageAjouterPeriodeDebut");
        this._elementAjouterFin = this.element.querySelector("#creationPersonnageAjouterPeriodeFin");
        this._elementListe = this.element.querySelector("#creationPersonnageListePeriodes");

        this._actionAjouterDebut = ()=>{
            let periode = new PeriodeHistorique();
            if(this._personnage.histoire.historique.length>0)
                periode.date = this._personnage.histoire.historique[0].date;
            else
                periode.date = this._personnage.histoire.dateNaissance;
            this._personnage.histoire.ajoutePeriodeDebut(periode);
            this.chargePeriodes(); //TODO Bourrin mais rapide à coder pour le moment
        };
        this._elementAjouterDebut.addEventListener("click", this._actionAjouterDebut);
        this._actionAjouterFin = ()=>{
            let periode = new PeriodeHistorique();
            if(this._personnage.histoire.historique.length>0)
                periode.date = this._personnage.histoire.historique[this._personnage.histoire.historique.length-1].date;
            else
                periode.date = this._personnage.histoire.dateNaissance;
            this._personnage.histoire.ajoutePeriodeFin(periode);
            this.chargePeriodes(); //TODO Bourrin mais rapide à coder pour le moment
        };
        this._elementAjouterFin.addEventListener("click", this._actionAjouterFin);
    }

    /**
     * @override
     * @inheritdoc
     */
    ouvre(animation){
        super.ouvre(animation);

        this.chargeDatesUtiles();
        this.chargePeriodes();
    }

    chargeDatesUtiles(){
        let datesUtiles = [];
        datesUtiles.push({
            "date" : this._personnage.histoire.dateNaissance.split("-")[0],
            "texte" : Lang.get(`DateNaissance`)
        });
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
    }

    chargePeriodes(){
        this._personnage.histoire.triePeriodes();
        this._elementListe.innerHTML = "";
        for(let periode of this._personnage.histoire.historique)
        {
            let selecteur = new SelecteurPeriodeCarriere(Lang.get("InputDate"), Lang.get("InputCarrieres"), Lang.get("InputAffiliation"), Lang.get("InputEvenements"));
            selecteur.date = periode.date;
            selecteur.carrieres = periode.carrieres;
            selecteur.affiliation = periode.affiliation;
            selecteur.evenements = periode.evenements;
            selecteur.onchangedate = (date)=>{
                periode.date = date;
                this.chargePeriodes(); //TODO Bourrin mais rapide à coder pour le moment
            };
            selecteur.onclickcarriere = ()=>{
                let carrieres = {};
                for(let carriere of this._personnage.elements.carrieres)
                    carrieres[carriere.nom] = carriere.nom;
                PopupSelect.selectionne(Lang.get("TitreSelectionCarrieres"), Lang.get("TexteSelectionCarrieres"), carrieres, periode.carrieres, true, (selection)=>{
                    if(selection)
                    {
                        periode.carrieres = selection;
                        selecteur.carrieres = selection;
                    }
                });
            };
            selecteur.onclickaffiliation = ()=>{
                let relations = {};
                for(let relation of this._personnage.elements.relations)
                    relations[relation.nom] = relation.nom;
                PopupSelect.selectionne(Lang.get("TitreSelectionAffiliation"), Lang.get("TexteSelectionAffiliation"), relations, periode.affiliation, true, (selection)=>{
                    if(selection)
                    {
                        periode.affiliation = selection;
                        selecteur.affiliation = selection;
                    }
                });
            };
            selecteur.onchangeevenement = (evenements)=>{
                periode.evenements = evenements;
            };
            selecteur.onsupprime = ()=>{
                PopupConfirmation.confirme(Lang.get("ConfirmationSupressionPeriodeHistorique"), ()=>{
                    this._personnage.histoire.supprimePeriode(periode)
                    this.chargePeriodes(); //TODO Bourrin mais rapide à coder pour le moment
                });
            };



            this._elementListe.appendChild(selecteur.element);
        }
    }

    detruit(){
        super.detruit();
        this._elementAjouterDebut.removeEventListener("click", this._actionAjouterDebut);
        this._elementAjouterFin.removeEventListener("click", this._actionAjouterFin);
    }
}
