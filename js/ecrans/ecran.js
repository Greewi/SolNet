import { Page } from "../pages/page";

/**
 * Représente un écran de l'application
 */
export class Ecran{
    
    constructor(){
        /**
         * @type {Page}
         */
        this._pageActuelle = null;
    }

    /**
     * @param {Object.<string, Page>} pages Les pages de l'écran
     */
    setPages(pages){
        this._pages = pages;
    }

    /**
     * @param {string} accueil Le nom de la page à ouvrir par défaut
     */
    setPageParDefaut(accueil){
        this._accueil = accueil;
    }

    /**
     * Ouvre une page (et l'écran s'il n'est pas déjà ouvert)
     * @param {string}  [page] Le nom de la page à ouvrir. Ouvre l'accueil par défaut
     */
    ouvre(page, avancer){
        page = page || this._accueil;
        avancer = avancer===undefined ? true : avancer;
        
        if(this._pageActuelle)
            this._pageActuelle.ferme(avancer);
        this._pageActuelle = this._pages[page];
        this._pageActuelle.ouvre(avancer);
    }

    /**
     * Ferme l'écran et le détruit
     */
    ferme(){
        for(let idPage in this._pages)
            this._pages[idPage].detruit();
    }

}