import { PopupSelect } from "./popup";
import { Lang } from "../lang";

/**
 * Représente un input destiné à rentrer une date.
 */
export class InputDate {

    /**
     * 
     * @param {HTMLElement} element L'élément à utiliser
     * @param {boolean} mois détermine s'il faut gérer le mois
     * @param {boolean} jour détérmine s'il faut gérer le jour du mois
     */
    constructor(element, mois, jour) {
        this._anneeMin = 1980;
        this._anneeMax = 2093;
        this._annee = 2093;
        this._mois = 1;
        this._jour = 1;

        this._blocAnnee = document.createElement("span");
        this._blocAnnee.classList.add("page__selecteur_date_selection");
        this._blocAnnee.innerHTML = this._annee;
        this._blocAnnee.onclick = () => {
            this._onclickAnnee();
        };
        element.appendChild(this._blocAnnee);
        if (mois) {
            element.appendChild(document.createTextNode(" - "));
            this._blocMois = document.createElement("span");
            this._blocMois.classList.add("page__selecteur_date_selection");
            this._blocMois.innerHTML = this._mois;
            this._blocMois.onclick = () => {
                this._onclickMois();
            };
            element.appendChild(this._blocMois);
            if (jour) {
                element.appendChild(document.createTextNode(" - "));
                this._blocJour = document.createElement("span");
                this._blocJour.classList.add("page__selecteur_date_selection");
                this._blocJour.innerHTML = this._jour;
                this._blocJour.onclick = () => {
                    this._onclickJour();
                };
                element.appendChild(this._blocJour);
            }
        }
    }

    /**
     * Gère un clic sur le bloc de l'année
     */
    _onclickAnnee() {
        let annees = {};
        for (let i = this._anneeMin; i <= this._anneeMax; i++)
            annees["" + i] = "" + i;
        PopupSelect.selectionne(Lang.get("TitreSelectionDateAnnee"), Lang.get("TexteSelectionDateAnnee"), annees, [this._annee], false, (selection) => {
            if (selection) {
                this._annee = parseInt(selection[0]);
                this._onNouvelleValeur();
            }
        });
    }

    /**
     * Gère un clic sur le bloc du mois
     */
    _onclickMois() {
        let mois = {};
        for (let i = 1; i <= 12; i++)
            mois["" + i] = "" + i;
        PopupSelect.selectionne(Lang.get("TitreSelectionDateMois"), Lang.get("TexteSelectionDateMois"), mois, [this._mois], false, (selection) => {
            if (selection) {
                this._mois = parseInt(selection[0]);
                this._onNouvelleValeur();
            }
        });
    }

    /**
     * Gère un clic sur le bloc du jour
     */
    _onclickJour() {
        let jourMax = 30;
        if (this._mois == 1 || this._mois == 3 || this._mois == 5 || this._mois == 7 || this._mois == 8 || this._mois == 10 || this._mois == 12)
            jourMax = 31;
        if (this._mois == 2)
            jourMax = this._annee % 4 == 0 ? 29 : 28;
        let jours = {};
        for (let i = 1; i <= jourMax; i++)
            jours["" + i] = "" + i;
        PopupSelect.selectionne(Lang.get("TitreSelectionDateJour"), Lang.get("TexteSelectionDateJour"), jours, [this._jour], false, (selection) => {
            if (selection) {
                this._jour = parseInt(selection[0]);
                this._onNouvelleValeur();
            }
        });
    }

    _onNouvelleValeur() {
        let date = "";
        if (this._blocAnnee) {
            date = this._annee;
            this._blocAnnee.innerHTML = this._annee;
        }
        if (this._blocMois) {
            date += `-${this._mois}`;
            this._blocMois.innerHTML = this._mois;
        }
        if (this._blocJour) {
            date += `-${this._jour}`;
            this._blocJour.innerHTML = this._jour;
        }
        if (this._onchange)
            this._onchange(date);
    }

    get date() {
        let date = this._annee;
        if (this._blocMois) {
            date += `-${this._mois}`;
            if (this._blocJour)
                date += `-${this._jour}`;
        }
    }

    set date(valeur) {
        let date = valeur.split("-");
        this._annee = parseInt(date[0]);
        this._blocAnnee.innerHTML = this._annee;
        if (this._blocMois) {
            this._mois = parseInt(date[1]);
            this._blocMois.innerHTML = this._mois;
            if (this._blocJour) {
                this._jour = parseInt(date[2]);
                this._blocJour.innerHTML = this._jour;
            }
        }
    }

    set onchange(callback) {
        this._onchange = callback;
    }
    
    set min(valeur){
        this._anneeMin = parseInt(valeur);
    }

    set max(valeur){
        this._anneeMax = parseInt(valeur);
    }
}