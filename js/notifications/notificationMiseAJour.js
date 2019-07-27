import { Notification } from "./notification";
import { ProgressiveWebApp } from "../progressiveWebApp";

/**
 * Notification qui se déclenche quand une nouvelle version a été téléchargée
 */
export class NotificationMiseAJour extends Notification {
    /**
     * @param {ServiceWorker} worker le service worker de l'application
     */
    constructor(worker) {
        super("notificationMiseAJour");
        ProgressiveWebApp.onApplicationUpdate = (event) => {
            this.ajouteDansInterface();
        };
    }

    /**
     * Méthode déclenchée lors du click sur le bouton d'action
     */
    onAction() {
        super.onAction();
        // On indique au service worker qu'il peut changer de page tout de suite
        ProgressiveWebApp.getServiceWorker().postMessage({ action: 'skipWaiting' });
        // Workaround : sur firefox et safari, skipWaiting ne semble pas recharger la page. On effectue un reload à la place.
        setTimeout(() => {
            document.location.reload();
        }, 1500);
    }
}