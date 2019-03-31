import { BibliothequeTemplates } from "../ressources/templates";
import { SelecteurSansDescription, Selecteur } from "./selecteur";

let nombrePopupOuverte = 0;
let overlayPopup = document.getElementById("racinePopup");

/**
 * Définit une popup générique
 */
export class Popup {
    /**
     * @param {string} template Le template de la popup
     */
    constructor(template) {
        this._element = BibliothequeTemplates.getTemplate(template).content.cloneNode(true).firstChild;
    }

    /**
     * @returns {HTMLElement} l'élément DOM de ce template
     */
    get element() {
        return this._element;
    }

    /**
     * Ouvre la popup
     * @param {function} callback Une callback appelée à la fin de l'ouverture de la popup
     */
    ouvre() {
        nombrePopupOuverte++;
        overlayPopup.classList.add("racine_popup__ouverte");
        overlayPopup.appendChild(this._element);
    }

    /**
     * Ferme la popup
     * @param {function} callback Une callback appelée à la fin de la fermeture de la popup
     */
    ferme() {
        nombrePopupOuverte--;
        if (nombrePopupOuverte == 0)
            overlayPopup.classList.remove("racine_popup__ouverte");
        overlayPopup.removeChild(this._element);
    }
}

/**
 * Popup de confirmation simple
 */
export class PopupConfirmation extends Popup {
    /**
     * @param {string} question La question à poser
     * @param {function(boolean)} callback la callback recevant la réponse en paramètre
     */
    constructor(question, callback) {
        super("popupConfirmation");
        this._question = this._element.querySelector(".popup__texte");
        this._question.innerHTML = question;

        this._boutonOui = this._element.querySelector(".popup__bouton_gauche");
        this._boutonOui.onclick = () => {
            callback(true);
            this.ferme();
        };
        this._boutonNon = this._element.querySelector(".popup__bouton_droite");
        this._boutonNon.onclick = () => {
            callback(false);
            this.ferme();
        };
    }

    /**
     * Ouvre une popup de confirmation et exécute l'action donnée en paramètre si l'utilisateur clique sur oui
     * @param {string} question la question à poser
     * @param {function} action la fonction à exécuter si l'utilisateur confirme
     */
    static confirme(question, action) {
        let popup = new PopupConfirmation(question, (reponse) => {
            if (reponse)
                action();
        });
        popup.ouvre();
    }
}

/**
 * Popup de sélection d'un élément dans une liste
 */
export class PopupSelect extends Popup {
    /**
     * 
     * @param {string} titre Le titre de la popup
     * @param {string} texte Le texte de la popup
     * @param {Object<string, string>} valeurs Les valeurs possible de la sélection
     * @param {string[]} selectionInitiale Les valeurs sélectionnées initialement
     * @param {boolean} selectionMultiple Si vrai, l'utilisateur pourra sélectionner plusieurs élément, sinon un seul.
     * @param {function(string[])} callback La fonction appelée à la fermeture recevant la liste des éléments
     *   sélectionnée. Si l'utilisateur annule, elle reçoit la liste de sélection initiale.
     */
    constructor(titre, texte, valeurs, selectionInitiale, selectionMultiple, callback) {
        super("popupSelection");

        this._valeurs = valeurs;
        this._selectionInitiale = selectionInitiale;
        this._selectionMultiple = selectionMultiple;
        this._callback = callback;

        this._titre = this._element.querySelector(".popup__titre");
        this._titre.innerHTML = titre;
        this._texte = this._element.querySelector(".popup__texte");
        this._texte.innerHTML = texte;
        this._liste = this._element.querySelector(".popup_selection__liste");

        this._boutonSelectionner = this._element.querySelector(".popup__bouton_gauche");
        this._boutonSelectionner.onclick = () => {
            let selectionFinale = [];
            for (let valeur in this._selection)
                if (this._selection[valeur])
                    selectionFinale.push(valeur);
            callback(selectionFinale);
            this.ferme();
        };
        this._boutonAnnuler = this._element.querySelector(".popup__bouton_droite");
        this._boutonAnnuler.onclick = () => {
            callback(this._selectionInitiale);
            this.ferme();
        };

        this._initialiseListe();
    }

    /**
     * Initialise la liste de sélection
     */
    _initialiseListe() {
        this._liste.innerHTML = "";
        this._selection = {};
        for (let valeur of this._selectionInitiale)
            if (this._valeurs[valeur] !== undefined)
                this._selection[valeur] = true;
        for (let valeur in this._valeurs) {
            this._selection[valeur] = !!this._selection[valeur]; //Pour compléter les valeurs manquantes

            let selecteur = new SelecteurSansDescription(this._valeurs[valeur], true);
            selecteur.onclick = (e) => {
                if (this._selection[valeur]) {
                    if (this._selectionMultiple) {
                        this._selection[valeur] = false;
                        selecteur.deselectionne();
                    }
                }
                else {
                    if (!this._selectionMultiple) {
                        Selecteur.deselectionneTous(this._liste);
                        for (let val in this._selection)
                            this._selection[val] = false;
                        this._selection[valeur] = true;
                        selecteur.selectionne();
                        this._boutonSelectionner.onclick();
                    }
                    else {
                        this._selection[valeur] = true;
                        selecteur.selectionne();
                    }
                }
            };
            if (this._selection[valeur]) {
                selecteur.selectionne();
                this._selecteurParDefaut = selecteur.element.firstChild;
            }
            this._liste.appendChild(selecteur.element);
        }
    }

    ouvre() {
        super.ouvre();
        if (this._selecteurParDefaut && this._selecteurParDefaut.scrollIntoView)
            this._selecteurParDefaut.scrollIntoView({ block: "center", inline: "nearest" });
    }

    static selectionne(titre, texte, valeurs, selectionInitiale, selectionMultiple, callback) {
        let popup = new PopupSelect(titre, texte, valeurs, selectionInitiale, selectionMultiple, (selection) => {
            callback(selection);
        });
        popup.ouvre();
    }
}
