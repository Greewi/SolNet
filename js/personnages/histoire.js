import { Element } from "./element";

export class Histoire{
    constructor(){
        this.dateNaissance = new Date("2050-01-01");
        this.lieuNaissance = "";
        this.detailNaissance = "";
        /**
         * @type {PeriodeHistorique[]}
         */
        this.historique = [];
    }

    _getIndicePeriode(periode){
        for(let i=0; i<this.historique.length; i++)
            if(this.historique[i] == periode)
                return i;
        return -1;
    }

    supprimePeriode(periode){
        let i = this._getIndicePeriode(periode);
        if(i>=0)
            this.historique.splice(i, 1);
    }

    montePeriode(periode){
        let i = this._getIndicePeriode(periode);
        if(i>0)
        {
            this.historique[i] = this.historique[i-1];
            this.historique[i-1] = periode;
        }
    }

    descendPeriode(periode){
        let i = this._getIndicePeriode(periode);
        if(i>=0 && i<this.historique.length-1)
        {
            this.historique[i] = this.historique[i+1];
            this.historique[i+1] = periode;
        }
    }

    ajoutePeriodeDebut(periode){
        this.historique.unshift(periode);
    }

    ajoutePeriodeFin(periode){
        this.historique.push(periode);
    }
}

export class PeriodeHistorique{
    constructor(){
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