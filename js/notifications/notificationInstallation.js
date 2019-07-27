import { Notification } from "./notification";
import { ProgressiveWebApp } from "../progressiveWebApp";

/**
 * Notification qui se déclenche si l'utilisateur peut installer l'application sur son appareil
 */
export class NotificationInstallation extends Notification {
    constructor() {
        super("notificationInstallation");
        ProgressiveWebApp.onBeforeInstallPrompt = (event) => {
            // On empèche l'affichage du prompt sur les vieux navigateurs
            event.preventDefault();
            // On mémorise l'évent
            this._event = event;
            // On affiche la notification
            this.ajouteDansInterface();
        };
    }

    /**
     * Méthode déclenchée lors du click sur le bouton d'action
     */
    onAction() {
        super.onAction();
        this._event.prompt();
    }
}