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
     * @param {string} symbole le symbole de l'élément de navigation
     * @param {function} callbackOnClick une callback appelée lors du click sur l'élément de navigation
     */
    constructor(texte, symbole, callbackOnClick){
        this._texte = texte;
        this._symbole = symbole;
        this._callback = callbackOnClick;
        this._element = document.createElement("div");
        this._element.classList.add("sidePanel_elementNavigation");
        this._element.addEventListener("click", this._callback);
        
        this._elementIcone = document.createElement("div");
        this._elementIcone.classList.add("sidePanel_elementNavigation_icone");
        this._elementIcone.innerHTML = symbole;
        this._element.appendChild(this._elementIcone);

        this._elementTexte = document.createElement("div");
        this._elementTexte.classList.add("sidePanel_elementNavigation_texte");
        this._elementTexte.innerHTML = texte;
        this._element.appendChild(this._elementTexte);
    }

    /**
     * @returns {HTMLElement} l'élément HTML de cet élément de navigation
     */
    getElement(){
        return this._element;
    }
};