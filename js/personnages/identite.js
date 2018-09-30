export class Identite{
    constructor(){
        /**
         * @type {string}
         */
        this.pseudonyme = "";
        /**
         * @type {string}
         */
        this.nomAdministratif = "";
        /**
         * @type {Object<string, string>}
         */
        this.roles = {};
        /**
         * @type {string}
         */
        this.profession = null;
        /**
         * @type {string}
         */
        this.natureEsprit = null;
        /**
         * @type {string}
         */
        this.enveloppeUsuelle = null;
        /**
         * @type {string}
         */
        this.affiliation = "";
        /**
         * @type {string}
         */
        this.genre = "";
    }
};