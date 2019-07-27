/**
 * Représente le sommaire du panneau latéral
 */
export class Sommaire {
    constructor(){
        this._elementsNavigation = [];
    }

    /**
     * @param {ElementSommaire} elementNavigation l'élément de navigation à ajouter
     */
    ajouteElementNavigation(elementNavigation){
        this._elementsNavigation.push(elementNavigation);
    }

    /**
     * Ajoute le sommaire dans l'arbre DOM
     * @param {HTMLElement} elementRacine l'élément racine dans lequel ajouter le sommaire
     */
    ajouteDans(elementRacine){
        for(let elementNavigation of this._elementsNavigation)
            elementRacine.appendChild(elementNavigation.getElement());
    }
};

/**
 * Représente un élément de navigation du panneau latéral
 */
export class ElementSommaire {
    /**
     * @param {string} texte le texte de l'élément de navigation
     * @param {number} niveau le niveau de l'élément de navigation (par défaut 1)
     * @param {function} callbackOnClick une callback appelée lors du click sur l'élément de navigation
     */
    constructor(texte, niveau, callbackOnClick){
        this._texte = texte;
        this._niveau = niveau || 1;
        this._element = document.createElement("button");
        this._element.classList.add("sidePanel_elementNavigation");
        this._element.classList.add(`sidePanel_elementNavigation_niveau${niveau}`);
        this._element.innerHTML = texte;
        this._callback = callbackOnClick;
        this._element.addEventListener("click", this._callback);
    }

    /**
     * @returns {HTMLElement} l'élément HTML de cet élément de navigation
     */
    getElement(){
        return this._element;
    }
};