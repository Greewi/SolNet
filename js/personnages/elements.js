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
        this.equipements = [];
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
    possedeElement(id, tableau){
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
        return this.possedeElement(id, this.carrieres);
    }
    
    /**
     * @param {string} id 
     * @returns {boolean}
     */
    possedeRelation(id){
        return this.possedeElement(id, this.relations);
    }

    /**
     * @param {string} id 
     * @returns {boolean}
     */
    possedeModification(id){
        return this.possedeElement(id, this.modifications);
    }
    
    /**
     * @param {string} id 
     * @returns {boolean}
     */
    possedeEquipement(id){
        return this.possedeElement(id, this.equipements);
    }

    /**
     * @param {string} id 
     * @returns {boolean}
     */
    possedeLogiciel(id){
        return this.possedeElement(id, this.logiciels);
    }
};