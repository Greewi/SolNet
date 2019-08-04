import { Ecran } from "./ecrans/ecran";
import { Sommaire, ElementSommaire } from "./ui/sommaire";
import { InterfaceGenerale } from "./ui/interfaceGenerale";

/**
 * @type {Ecran[]}
 */
let _pileEcrans = [];
window._pileEcrans = _pileEcrans;

/**
 * Gère l'ouverture et la fermeture des écrans
 */
export class Routeur {

    /**
     * Initialise le routeur
     */
    static initialise() {
        window.addEventListener("beforeunload", function () {
        });
    }

    /**
     * Ouvre un écran en l'empile
     * @param {Ecran} ecran l'écran à ouvrer
     */
    static empileEcran(ecran) {
        if (this._getEcranActuel())
            this._getEcranActuel().ferme();
        _pileEcrans.push(ecran);
        this._getEcranActuel().ouvre();
        this._metAJourNavigation();
    }

    /**
     * Ferme un écran et dépile tous les écrans au dessus delui (lui y compris)
     */
    static depileEcran(ecran) {
        let indexEcran = _pileEcrans.indexOf(ecran);
        if (indexEcran == -1)
            return;
        if (this._getEcranActuel())
            this._getEcranActuel().ferme();
        _pileEcrans = _pileEcrans.slice(0, indexEcran);
        window._pileEcrans = _pileEcrans;
        this._getEcranActuel().ouvre();
        this._metAJourNavigation();
    }

    /**
     * Rouvre un écran et dépile tous les écrans au dessus de lui.
     * @param {Ecran} ecran l'écran à rouvrir
     */
    static depileJusqueEcran(ecran) {
        let indexEcran = _pileEcrans.indexOf(ecran);
        if (indexEcran == -1)
            return;
        if (this._getEcranActuel())
            this._getEcranActuel().ferme();
        _pileEcrans = _pileEcrans.slice(0, indexEcran + 1);
        window._pileEcrans = _pileEcrans;
        this._getEcranActuel().ouvre();
        this._metAJourNavigation();
    }

    /**
     * @returns {Ecran} l'écran actuel (celui du haut de la pile)
     */
    static _getEcranActuel() {
        return _pileEcrans[_pileEcrans.length - 1];
    }

    /**
     * Met à jour les informations de navigation
     */
    static _metAJourNavigation() {
        let filAriane = new Sommaire();
        for (let ecran of _pileEcrans) {
            let titre  = ecran.getTitre();
            let symbole = ecran == this._getEcranActuel() ? "#" : "<";
            let action = () => this.depileJusqueEcran(ecran);
            filAriane.ajouteElementNavigation(new ElementSommaire(titre, symbole, action));
        }
        InterfaceGenerale.setFilAriane(filAriane);
    }
};