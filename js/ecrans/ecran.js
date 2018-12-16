import { Page } from "../pages/page";
import { Footer } from "../footer";
import { Lang } from "../lang";

/**
 * Représente un écran de l'application
 */
export class Ecran{
    
    constructor(){
        /**
         * @type {Page}
         */
        this._pageActuelle = null;
        /**
         * @type {string}
         */
        this._nomPageActuelle = null;
        /**
         * @type {Object.<string, Page>}
         */
        this._pages= {};
        /**
         * @type {string}
         */
        this._accueil = null;
        /**
         * @type {string[]}
         */
        this._ordrePage = null;
        /**
         * @type {function}
         */
        this._onRetour = null;
        /**
         * @type {string}
         */
        this._textBoutonRetour = Lang.get("BoutonRetour");
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
     * Définit l'ordre des pages et affiche les boutons "Suivant" et "Précédent".
     * @param {string[]} listeNomPages La liste des noms des pages dans l'ordre
     */
    setOrdrePages(listeNomPages){
        this._ordrePage = listeNomPages;
    }

    /**
     * Définit l'action à exécuter lors d'un clic sur le bouton retour
     * @param {function} callback L'action à exécuter lors d'un clic sur le bouton retour. null pour déactiver.
     */
    setActionRetour(callback, texteBouton){
        this._textBoutonRetour = texteBouton || Lang.get("BoutonRetour");
        Footer.setBouton2()
        this._onRetour = callback;
    }

    /**
     * Renvoie le nom de la page actuelle
     * @returns {string} Le nom de la page actuelle
     */
    getPageActuelle(){
        return this._nomPageActuelle;
    }

    /**
     * Ouvre une page (et l'écran s'il n'est pas déjà ouvert)
     * @param {string}  [page] Le nom de la page à ouvrir. Ouvre l'accueil par défaut
     */
    ouvre(page, avancer){
        page = page || this._accueil;
        avancer = avancer===undefined ? true : avancer;
        //Ouverture de la page
        if(this._pageActuelle)
            this._pageActuelle.ferme(avancer);
        this._pageActuelle = this._pages[page];
        this._nomPageActuelle = page;
        this._pageActuelle.ouvre(avancer);
        //Mise à jour du footer
        Footer.desactiveBoutons();
        if(this._ordrePage)
        {
            let i=0;
            while(i<this._ordrePage.length && this._ordrePage[i]!=page)
                i++;
            if(i<this._ordrePage.length)
            {
                if(i>0)
                    Footer.setBouton1(Lang.get("BoutonPrecedent"), this._creeActionAllerAPage(this._ordrePage[i-1], false));
                if(i<this._ordrePage.length-1)
                    Footer.setBouton3(Lang.get("BoutonSuivant"), this._creeActionAllerAPage(this._ordrePage[i+1], true));
            }
        }
        if(this._onRetour)
            Footer.setBouton2(this._textBoutonRetour, this._onRetour);
    }

    _creeActionAllerAPage(page, avancer){
        return ()=>{
            this.ouvre(page, avancer);
        };
    }

    /**
     * Ferme l'écran et le détruit
     */
    ferme(){
        for(let idPage in this._pages)
            this._pages[idPage].detruit();
    }

}