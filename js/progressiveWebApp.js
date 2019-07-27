/**
 * Gère les fonctions liée à la nature de la progressive webapp (service worker et installation).
 */
export class ProgressiveWebApp {
    /**
     * @param {ServiceWorker} serviceWorker le service worker de l'application
     */
    static initialise() {
        this._worker = null;
        this._beforeInstallEvent = null;
        this._listenerBeforeInstallPrompt = null;
        this._applicationUpdateEvent = null;
        this._listenerApplicationUpdate = null;

        // Gestion du lifecycle (sortie d'une pause tue l'affichage sinon)
        document.addEventListener('resume', () => window.location.reload());
        window.addEventListener('beforeinstallprompt', event => this._onBeforeInstallPrompt(event));
        this._initialiseWorker();
    }


    /**
     * @returns {ServiceWorker} le service worker de l'application ou null
     */
    static getServiceWorker() {
        return this._worker;
    }


    /**
     * Défini l'observateur sur l'évenement 'beforeinstallprompt'
     */
    static set onBeforeInstallPrompt(observateur) {
        if (this._beforeInstallEvent != null)
            observateur(this._beforeInstallEvent);
        this._listenerBeforeInstallPrompt = observateur;
    }

    /**
     * Défini l'observateur sur l'évenement 'statechange' du worker
     */
    static set onApplicationUpdate(observateur) {

        if (this._applicationUpdateEvent != null)
            observateur(this._applicationUpdateEvent);
        this._listenerApplicationUpdate = observateur;
    }

    /**
     * Initialise le service worker
     */
    static _initialiseWorker() {
        // Récupération de la version du worker
        if ('BroadcastChannel' in window) {
            const channel = new BroadcastChannel('sw-messages');
            channel.addEventListener('message', event => {
                console.log('Received', event.data);
                if (event.data.version)
                    this._versionWorker = event.data.version;
            });
        }

        if ('serviceWorker' in navigator) {
            // Enregistrement du service worker
            navigator.serviceWorker
                .register("/serviceWorker.js")
                .then((register) => {
                    console.log("Service Worker enregistré");
                    return new Promise((accept, reject) => {
                        register.addEventListener("updatefound", () => {
                            this._worker = register.installing;
                            accept();
                        });
                    });
                })
                // Si on a une mise à jour du service worker on affiche la notification
                .then(() => {
                    console.log("Nouveau service Worker disponible");
                    this._worker.addEventListener("statechange", (event) => {
                        if (this._worker.state == "installed") {
                            console.log("Nouveau Service Worker installé");
                            if (localStorage.getItem("versionWorker") != null && localStorage.getItem("versionWorker") != this._versionWorker)
                                this._onApplicationUpdate(event);
                            if (this._versionWorker !== undefined)
                                localStorage.setItem("versionWorker", this._versionWorker);
                        }
                    });
                });

            //Raffraichissement de la page
            let raffraichissementEnCours;
            navigator.serviceWorker.addEventListener('controllerchange', function () {
                if (!raffraichissementEnCours)
                    window.location.reload();
                raffraichissementEnCours = true;
            });
        }
    }

    static _onBeforeInstallPrompt(event) {
        this._beforeInstallEvent = event;
        if (this._listenerBeforeInstallPrompt)
            this._listenerBeforeInstallPrompt(event);
    }

    static _onApplicationUpdate(event) {
        this._applicationUpdateEvent = event;
        if (this._listenerApplicationUpdate)
            this._listenerApplicationUpdate(event);
    }
}