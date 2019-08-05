/**
 * Représente le sommaire du panneau latéral
 */
export class Sommaire {
    /**
     * @param {string} type le type du sommaire
     */
    constructor(type) {
        this._type = type || "Sommaire";
        this._elementsNavigation = [];
    }
    /**
     * @param {string} texte le texte de l'élément de navigation
     * @param {string} symbole le symbole de l'élément de navigation
     * @param {function} callbackOnClick une callback appelée lors du click sur l'élément de navigation
     */
    ajoute(texte, symbole, callbackOnClick) {
        this._ajouteElementNavigation(new ElementSommaire(this._type, texte, symbole, callbackOnClick));
    }

    /**
     * @param {ElementSommaire} elementNavigation l'élément de navigation à ajouter
     */
    _ajouteElementNavigation(elementNavigation) {
        this._elementsNavigation.push(elementNavigation);
    }

    /**
     * Ajoute le sommaire dans l'arbre DOM
     * @param {HTMLElement} elementRacine l'élément racine dans lequel ajouter le sommaire
     */
    ajouteDans(elementRacine) {
        for (let elementNavigation of this._elementsNavigation)
            elementRacine.appendChild(elementNavigation.getElement());
    }
};

/**
 * Représente un élément de navigation du panneau latéral
 */
const ElementSommaire = class {
    /**
     * @param {string} type le type du sommaire
     * @param {string} texte le texte de l'élément de navigation
     * @param {string} symbole le symbole de l'élément de navigation
     * @param {function} callbackOnClick une callback appelée lors du click sur l'élément de navigation
     */
    constructor(type, texte, symbole, callbackOnClick) {
        this._texte = texte;
        this._symbole = symbole;
        this._callback = callbackOnClick;
        this._element = document.createElement("div");
        this._element.classList.add("sidePanel_elementNavigation");
        this._element.classList.add(`sidePanel_element${type}`);
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
    getElement() {
        return this._element;
    }
};