/**
 * Affiche et fait évoluer l'indicateur de chargement initial de l'application
 */
export class Loader {
    /**
     * Initialise le chargement
     */
    static initialise(){
        this._etapes = 0;
        this._etapesTeminees = 0;
        this._sousEtapes = 0;
        this._sousEtapesTeminees = 0;

        this._overlay = document.getElementById("loaderOverlay");
        this._barreChargementPrincipale = document.getElementById("loaderBarrePrincipale");
        this._barreChargementSecondaire = document.getElementById("loaderBarreSecondaire");
    }

    /**
     * Définit le nombre d'étape du chargement
     * @param {number} etapes Le nombre d'étape du chargement
     */
    static setNombreEtape(etapes){
        this._etapes = etapes;
        this._etapesTeminees = 0;
        this._barreChargementPrincipale.classList.remove("loader__barre-chargement-interieur__avec-transition");
        this._barreChargementPrincipale.style.width = `${Math.round(100*this._etapesTeminees/this._etapes)}%`;
    }

    /**
     * Termine une étape
     */
    static termineEtape(){
        this._etapesTeminees++;
        this._barreChargementPrincipale.classList.add("loader__barre-chargement-interieur__avec-transition");
        this._barreChargementPrincipale.style.width = `${Math.round(100*this._etapesTeminees/this._etapes)}%`;
    }

    /**
     * Définit le nombre de sous étape de l'étape en cours
     * @param {number} etapes Le nombre de sous étape de l'étape en cours
     */
    static setNombreSousEtape(sousEtapes){
        this._sousEtapes = sousEtapes;
        this._sousEtapesTeminees = 0;
        this._barreChargementSecondaire.classList.remove("loader__barre-chargement-interieur__avec-transition");
        this._barreChargementSecondaire.style.width = `${Math.round(100*this._sousEtapesTeminees/this._sousEtapes)}%`;
    }
    
    /**
     * Termine une sous étape
     */
    static termineSousEtape(){
        this._sousEtapesTeminees++;
        this._barreChargementSecondaire.classList.add("loader__barre-chargement-interieur__avec-transition");
        this._barreChargementSecondaire.style.width = `${Math.round(100*this._sousEtapesTeminees/this._sousEtapes)}%`;
    }

    /**
     * Termine le chargement de l'application
     */
    static termineChargement(){
        this._overlay.classList.add("loader__disparait");
        setTimeout(()=>{
            this._overlay.classList.add("loader__disparu");
        }, 1000);
    }
};