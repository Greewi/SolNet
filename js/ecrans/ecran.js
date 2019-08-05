import { Page } from "../pages/page";
import { Lang } from "../lang";
import { InterfaceGenerale } from "../ui/interfaceGenerale";

/**
 * Représente un écran de l'application
 */
export class Ecran {

    constructor() {
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
        this._pages = {};
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
    }

    /**
     * @returns {string} le titre de l'écran
     */
    getTitre() {
        if(this._pageActuelle)
            return this._pageActuelle.getTitre();
        else
            return "";
    }

    /**
     * @param {Object.<string, Page>} pages Les pages de l'écran
     */
    setPages(pages) {
        this._pages = pages;
    }

    /**
     * @param {string} accueil Le nom de la page à ouvrir par défaut
     */
    setPageParDefaut(accueil) {
        this._accueil = accueil;
    }

    /**
     * Définit l'ordre des pages et affiche les boutons "Suivant" et "Précédent".
     * @param {string[]} listeNomPages La liste des noms des pages dans l'ordre
     */
    setOrdrePages(listeNomPages) {
        this._ordrePage = listeNomPages;
    }

    /**
     * Définit l'action à exécuter lors d'un clic sur le bouton retour
     * @param {function} callback L'action à exécuter lors d'un clic sur le bouton retour. null pour déactiver.
     */
    setActionRetour(callback) {
        this._onRetour = callback;
    }

    /**
     * Renvoie le nom de la page actuelle
     * @returns {string} Le nom de la page actuelle
     */
    getPageActuelle() {
        return this._nomPageActuelle;
    }

    /**
     * Ouvre une page (et l'écran s'il n'est pas déjà ouvert)
     * @param {string}  [page] Le nom de la page à ouvrir. Ouvre l'accueil par défaut
     */
    ouvre(page, animation) {
        page = page || this._accueil;
        animation = animation === undefined ? Page.NOUVEL_ECRAN : animation;
        //Ouverture de la page
        if (this._pageActuelle)
            this._pageActuelle.ferme(animation);
        this._pageActuelle = this._pages[page];
        this._nomPageActuelle = page;
        this._pageActuelle.ouvre(animation);
        //Mise à jour du footer
        if (this._ordrePage) {
            let i = 0;
            while (i < this._ordrePage.length && this._ordrePage[i] != page)
                i++;
            if (i < this._ordrePage.length) {
                if (i > 0)
                    InterfaceGenerale.setActionPrecedent(this._creeActionAllerAPage(this._ordrePage[i - 1], Page.RECULER));
                else
                    InterfaceGenerale.setActionPrecedent(null);
                if (i < this._ordrePage.length - 1)
                    InterfaceGenerale.setActionSuivant(this._creeActionAllerAPage(this._ordrePage[i + 1], Page.AVANCER));
                else
                    InterfaceGenerale.setActionSuivant();
            }
        } else {
            InterfaceGenerale.setActionPrecedent(null);
            InterfaceGenerale.setActionSuivant();
        }
        InterfaceGenerale.setActionRetour(this._onRetour);
    }

    _creeActionAllerAPage(page, animation) {
        return () => {
            this.ouvre(page, animation);
        };
    }

    /**
     * Ferme l'écran
     */
    ferme(animation) {
        for (let idPage in this._pages)
            this._pages[idPage].ferme(animation);
    }

    /**
     * Détruit l'écran
     */
    detruit() {
        for (let idPage in this._pages)
            this._pages[idPage].detruit();
    }
}