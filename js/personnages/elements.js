import { Element } from "./element";

export class Elements{
    constructor(){
         /**
         * @type {Element[]}
         */
        this.traits = [];
        /**
         * @type {Element[]}
         */
        this.carrieres = [];
        /**
         * @type {Element[]}
         */
        this.relations = [];
        /**
         * @type {Element[]}
         */
        this.modifications = [];
        /**
         * @type {Element[]}
         */
        this.equipement = [];
        /**
         * @type {Element[]}
         */
        this.logiciels = [];
    }

    /**
     * @param {string} id 
     * @param {Element[]} tableau 
     * @returns {boolean}
     */
    _possedeElement(id, tableau){
        for(let element of tableau)
            if(element.id == id)
                return true;
        return false;
    }

    /**
     * @param {string} id 
     * @returns {boolean}
     */
    possedeCarriere(id){
        return this._possedeElement(id, this.carrieres);
    }
};