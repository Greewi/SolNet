
/**
 * Singloton : gère le footer de l'application
 */
export class Footer{
    /**
     * Initialise le footer
     */
    static initialise(){
        this._footer = document.getElementById("footer");
        /**
         * @type {HTMLButtonElement[]}
         */
        this._boutons = [
            document.getElementById("footerBouton1"),
            document.getElementById("footerBouton2"),
            document.getElementById("footerBouton3"),
        ];
        /**
         * @type {function[]}
         */
        this._actions = [
            null,
            null,
            null,
        ];
    }

    /**
     * Affiche le footer
     */
    static affiche(){
        this._footer.classList.add("footer__actif");
    }

    /**
     * Masque le footer
     */
    static masque(){
        this._footer.classList.remove("footer__actif");
    }

    /**
     * Réinitialise un bouton
     * @param {number} idBouton le numéro du bouton
     */
    static _reinitialiseBouton(idBouton){
        var bouton = this._boutons[idBouton];
        var action = this._actions[idBouton];
        if(action)
            bouton.removeEventListener("click", action);
        bouton.innerHTML = "";
        bouton.classList.remove("footer__bouton__actif");
    }

    /**
     * Définit le texte et l'action d'un bouton
     * @param {number} idBouton Le numéro du bouton
     * @param {string} texte Le texte du bouton
     * @param {function} nouvelleAction La callback du bouton
     */
    static _setBouton(idBouton, texte, nouvelleAction){
        var bouton = this._boutons[idBouton];
        var action = this._actions[idBouton];
        if(action)
            this._reinitialiseBouton(idBouton);
        bouton.innerHTML = texte;
        bouton.classList.add(`footer__bouton__actif`)
        this._actions[idBouton] = nouvelleAction;
        bouton.addEventListener("click", nouvelleAction);
    }

    /**
     * Définit le texte et l'action du bouton 1
     * @param {string} texte Le texte du bouton
     * @param {function} action L'action du bouton
     */
    static setBouton1(texte, action){
        this._setBouton(0, texte, action);
    }

    /**
     * Définit le texte et l'action du bouton 2
     * @param {string} texte Le texte du bouton
     * @param {function} action L'action du bouton
     */
    static setBouton2(texte, action){
        this._setBouton(1, texte, action);
    }
    
    /**
     * Définit le texte et l'action du bouton 3
     * @param {string} texte Le texte du bouton
     * @param {function} action L'action du bouton
     */
    static setBouton3(texte, action){
        this._setBouton(2, texte, action);
    }

    /**
     * Désactive et réinitialise le bouton 1
     */
    static desactiveBouton1(){
        this._reinitialiseBouton(0);
    }

    /**
     * Désactive et réinitialise le bouton 2
     */
    static desactiveBouton2(){
        this._reinitialiseBouton(1);
    }

    /**
     * Désactive et réinitialise le bouton 3
     */
    static desactiveBouton3(){
        this._reinitialiseBouton(2);
    }

    /**
     * Désactive et réinitialise tous les boutons
     */
    static desactiveBoutons(){
        this._reinitialiseBouton(0);
        this._reinitialiseBouton(1);
        this._reinitialiseBouton(2);
    }

};
