import { Element } from "./element";
import { Utils } from "../utils";

export class Histoire {
    constructor() {
        this.dateNaissance = "2050-01-01";
        this.lieuNaissance = "";
        this.detailNaissance = "";
        /**
         * @type {PeriodeHistorique[]}
         */
        this.historique = [];
    }

    _getIndicePeriode(periode) {
        for (let i = 0; i < this.historique.length; i++)
            if (this.historique[i] == periode)
                return i;
        return -1;
    }

    supprimePeriode(periode) {
        let i = this._getIndicePeriode(periode);
        if (i >= 0)
            this.historique.splice(i, 1);
    }

    montePeriode(periode) {
        let i = this._getIndicePeriode(periode);
        if (i > 0) {
            this.historique[i] = this.historique[i - 1];
            this.historique[i - 1] = periode;
        }
    }

    descendPeriode(periode) {
        let i = this._getIndicePeriode(periode);
        if (i >= 0 && i < this.historique.length - 1) {
            this.historique[i] = this.historique[i + 1];
            this.historique[i + 1] = periode;
        }
    }

    ajoutePeriodeDebut(periode) {
        this.historique.unshift(periode);
    }

    ajoutePeriodeFin(periode) {
        this.historique.push(periode);
    }

    triePeriodes() {
        this.historique = Utils.mergeSort(this.historique, (p1, p2)=>{
            return Utils.comparaisonDate(p1.date, p2.date);
        });
    }
}

export class PeriodeHistorique {
    constructor() {
        /**
         * @type {string}
         */
        this.date = "2050-01-01";
        /**
         * @type {string[]}
         */
        this.carrieres = [];
        /**
         * @type {string}
         */
        this.affiliation = "";
        /**
         * @type {string}
         */
        this.evenements = "";
    }
}