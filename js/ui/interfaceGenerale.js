import { Sommaire } from "./sommaire";

/**
 * Défini l'interface générale
 */
export class InterfaceGenerale {
    static initialise() {
        //Header
        this._header = document.getElementById("header");
        this._titre = document.getElementById("headerTitre");
        this._boutonMenu = document.getElementById("headerBoutonMenu");
        this._boutonPersonnage = document.getElementById("headerBoutonPersonnage");
        //Side panel
        this._sidePanel = document.getElementById("sidePanel");
        this._sidePanelOverlay = document.getElementById("sidePanelOverlay");
        this._sidePanelBoutonFermer = document.getElementById("sidePanelBoutonFermer");
        this._sidePanelTitre = document.getElementById("sidePanelTitre");
        this._sidePanelNotifications = document.getElementById("sidePanelNotifications");
        this._sidePanelFilAriane = document.getElementById("sidePanelFilAriane");
        this._sidePanelSommaire = document.getElementById("sidePanelSommaire");
        //Footer
        this._footer = document.getElementById("footer");
        this._footerBoutonRetour = document.getElementById("footerBoutonRetour");
        this._footerBoutonPrecedent = document.getElementById("footerBoutonPrecedent");
        this._footerBoutonSuivant = document.getElementById("footerBoutonSuivant");

        this._boutonMenu.addEventListener("click", (e) => {
            this.ouvreSidePanel();
        });
        this._sidePanelBoutonFermer.addEventListener("click", (e) => {
            this.fermeSidePanel();
        });
        this._sidePanelOverlay.addEventListener("click", (e) => {
            this.fermeSidePanel();
        });
    }

    /**
     * Défini le titre de la page actuelle
     * @param {string} titre le titre de la page actuelle
     */
    static setTitre(titre) {
        this._titre.innerHTML = titre;
    }
    /**
     * Définis le fil d'ariane
     * @param {Sommaire} filAriane le fil d'ariane
     */
    static setFilAriane(filAriane) {
        while (this._sidePanelFilAriane.firstChild)
            this._sidePanelFilAriane.removeChild(this._sidePanelFilAriane.firstChild);
        filAriane.ajouteDans(this._sidePanelFilAriane);
    }
    /**
     * Défini le sommaire de la page actuelle
     * @param {Sommaire} sommaire le sommaire
     */
    static setSommaire(sommaire) {
        while (this._sidePanelSommaire.firstChild)
            this._sidePanelSommaire.removeChild(this._sidePanelSommaire.firstChild);
        sommaire.ajouteDans(this._sidePanelSommaire);
    }
    /**
     * Défini le personnage actuellement lié
     * @param {string} idPersonnage l'ID du personnage lié ;  aucun personnage lié si null
     */
    static setPersonnage(idPersonnage) {

    }

    /**
     * Ajoute une notification
     * @param {HTMLElement} notification la notification à ajouter
     */
    static ajouteNotification(notification) {
        this._sidePanelNotifications.appendChild(notification);
        this.metAJourIconeNotifications();
    }
    /**
     * Supprime une notification
     * @param {HTMLElement} notification la notification à supprimer
     */
    static supprimeNotification(notification) {
        this._sidePanelNotifications.removeChild(notification);
        this.metAJourIconeNotifications();
    }
    /**
     * Met à jour l'icone de notification
     */
    static metAJourIconeNotifications() {
        if (this._sidePanelNotifications.children.length > 0) {
            this._boutonMenu.classList.add("header_boutonMenu_notification");
            this._boutonMenu.classList.add("iconeMenu_notification");
        }
        else {
            this._boutonMenu.classList.remove("header_boutonMenu_notification");
            this._boutonMenu.classList.remove("iconeMenu_notification");
        }
    }

    /**
     * Ouvre le panneau latéral
     */
    static ouvreSidePanel() {
        this._sidePanel.classList.add("sidePanel_ouvert");
        this._sidePanelOverlay.classList.add("sidePanel_overlay_ouvert");
    }

    /**
     * Ferme le panneau latéral
     */
    static fermeSidePanel() {
        this._sidePanel.classList.remove("sidePanel_ouvert");
        this._sidePanelOverlay.classList.remove("sidePanel_overlay_ouvert");
    }

    /**
     * Affiche le footer
     */
    static afficheFooter() {
        this._footer.classList.add("footer_actif");
    }

    /**
     * Masque le footer
     */
    static masqueFooter() {
        this._footer.classList.remove("footer_actif");
    }

    /**
     * Défini l'action à exécuter lors d'un clic sur le bouton retour
     * @param {function} callback une callback appelee lors d'un clic sur le bouton retour. Mettre null pour désactiver le bouton.
     */
    static setActionRetour(callback) {
        this._setBoutonFooter(this._footerBoutonRetour, callback);
    }

    /**
     * Défini l'action à exécuter lors d'un clic sur le bouton précédent
     * @param {function} callback une callback appelee lors d'un clic sur le bouton précédent. Mettre null pour désactiver le bouton.
     */
    static setActionPrecedent(callback) {
        this._setBoutonFooter(this._footerBoutonPrecedent, callback);
    }

    /**
     * Défini l'action à exécuter lors d'un clic sur le bouton suivant
     * @param {function} callback une callback appelee lors d'un clic sur le bouton suivant. Mettre null pour désactiver le bouton.
     */
    static setActionSuivant(callback) {
        this._setBoutonFooter(this._footerBoutonSuivant, callback);
    }

    /**
     * Active ou désactive un bouton et défini son action
     * @param {HTMLElement} bouton l'élément du bouton à définir
     * @param {funtion} callback la callback appelée lors du clic sur le bouton ou null pour déactiver le bouton
     */
    static _setBoutonFooter(bouton, callback) {
        bouton.onclick = callback || (() => { });
        if (callback)
            bouton.classList.add("footer_bouton_actif");
        else
            bouton.classList.remove("footer_bouton_actif");
    }
}