import { Ecran } from "../ecrans/ecran";
import { BibliothequeTemplates } from "../ressources/templates";

export class Page{
    /**
     * @param {string} id L'id de l'élément racine de la page dans le DOM
     */
    constructor(id, ecran){
        this._element = BibliothequeTemplates.getTemplate(id).content.cloneNode(true).children[0];
        this._ecran = ecran;
        this._transition = null;
        this._contenu = this._element.querySelector(".page__contenu");
        document.getElementById("main").appendChild(this._element);
    }

    /**
     * @returns {HTMLDivElement} L'élément DOM racine de la page
     */
    get element(){
        return this._element;
    }

    /**
     * @returns {Ecran} L'élément DOM racine de la page
     */
    get ecran(){
        return this._ecran;
    }

    /**
     * Ouvre la page
     * @param {number} animation Détermine l'animation d'ouverture (Page.AVANCER, Page.RECULER, PAGE.NOUVEL_ECRAN)
     */
    ouvre(animation){
        this._stopTransition();
        this._element.classList.add("page__on");
        this._element.classList.remove("page__vers-gauche");
        this._element.classList.remove("page__vers-droite");
        if(animation==Page.AVANCER)
        {
            this._element.classList.remove("page__depuis-gauche");
            this._element.classList.add("page__depuis-droite");
        }
        else if(animation==Page.RECULER)
        {
            this._element.classList.remove("page__depuis-droite");
            this._element.classList.add("page__depuis-gauche");
        }
        else
        {
            this._element.classList.add("page__depuis-vide");
        }
        this.scrollEnHaut();
    }

    /**
     * Ferme la page
     * @param {number} animation Détermine l'animation d'ouverture (Page.AVANCER, Page.RECULER, PAGE.NOUVEL_ECRAN)
     */
    ferme(animation){
        this._stopTransition();
        this._element.classList.remove("page__depuis-gauche");
        this._element.classList.remove("page__depuis-droite");
        this._element.classList.remove("page__depuis-vide");
        if(animation==Page.AVANCER)
        {
            this._element.classList.remove("page__vers-droite");
            this._element.classList.add("page__vers-gauche");
        }
        else if(animation==Page.RECULER)
        {
            this._element.classList.remove("page__vers-gauche");
            this._element.classList.add("page__vers-droite");
        }

        this._transition = setTimeout(() => {
            this._element.classList.remove("page__on");
        }, 500);
    }

    /**
     * Détruit la page et libère ses ressources
     */
    detruit(){
        this._stopTransition();
        this._element.classList.remove("page__on");
        document.getElementById("main").removeChild(this._element);
    }

    /**
     * Scroll le contenu de la page pour monter le haut de la page
     */
    scrollEnHaut(){
        if(this._contenu.scrollTo)
            this._contenu.scrollTo(0, 0);
    }

    /**
     * Scroll le contenu de la page pour monter le bas de la page
     */
    scrollEnBas(){
        if(this._contenu.scrollTo)
            this._contenu.scrollTo(0, this._contenu.scrollHeight);
    }

    /**
     * Annule les transitions de page en cours
     */
    _stopTransition(){
        if(this._transition !== null)
        {
            clearTimeout(this._transition);
            this._transition = null;
        }
    }

    static get AVANCER(){
        return 1;
    }
    static get RECULER(){
        return -1;
    }
    static get NOUVEL_ECRAN(){
        return 0;
    }
}