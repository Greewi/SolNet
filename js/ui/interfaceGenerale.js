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
        this._sidePanelNavigation = document.getElementById("sidePanelNavigation");
        //Footer
        this._footer = document.getElementById("footer");
        this._footerBouton1 = document.getElementById("footerBouton1");
        this._footerBouton2 = document.getElementById("footerBouton2");
        this._footerBouton3 = document.getElementById("footerBouton3");

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
        this._sidePanelTitre.innerHTML = titre;
    }
    /**
     * Défini le sommaire de la page actuelle
     * @param {Sommaire} sommaire l'élément du sommaire
     */
    static setSommaire(sommaire) {
        while (this._sidePanelNavigation.firstChild)
            this._sidePanelNavigation.removeChild(this._sidePanelNavigation.firstChild);
        sommaire.ajouteDans(this._sidePanelNavigation);
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
        if (this._sidePanelNotifications.children.length > 0)
            this._boutonMenu.classList.add("header_boutonMenu_notification")
        else
            this._boutonMenu.classList.remove("header_boutonMenu_notification")
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
}