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
}

export class PeriodeHistorique{
    constructor(){
        this.date = 2050;
        /**
         * @type {Element[]}
         */
        this.carrieres = {};
        this.affiliation = "";
        this.evenements = "";
    }
}