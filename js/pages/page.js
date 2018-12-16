import { Ecran } from "../ecrans/ecran";
import { Templates } from "../templates";

export class Page{
    /**
     * @param {string} id L'id de l'élément racine de la page dans le DOM
     */
    constructor(id, ecran){
        this._element = Templates.getTemplate(id).content.cloneNode(true).children[0];
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
     * @param {boolean} avancer Mettre à true pour avancer et false pour aller en arrière (Simule le swipe)
     */
    ouvre(avancer){
        this._stopTransition();
        this._element.classList.add("page__on");
        this._element.classList.remove("page__vers_gauche");
        this._element.classList.remove("page__vers_droite");
        this._element.classList.remove(avancer ? "page__depuis_gauche" : "page__depuis_droite");
        this._element.classList.add(avancer ? "page__depuis_droite" : "page__depuis_gauche");
        this.scrollEnHaut();
    }

    /**
     * Ferme la page
     * @param {boolean} avancer Mettre à true pour avancer et false pour aller en arrière (Simule le swipe)
     */
    ferme(avancer){
        this._stopTransition();
        this._element.classList.remove("page__depuis_gauche");
        this._element.classList.remove("page__depuis_droite");
        this._element.classList.remove(avancer ? "page__vers_droite" : "page__vers_gauche");
        this._element.classList.add(avancer ? "page__vers_gauche" : "page__vers_droite");
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
        this._contenu.scrollTo(0, 0);
    }

    /**
     * Scroll le contenu de la page pour monter le bas de la page
     */
    scrollEnBas(){
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
}