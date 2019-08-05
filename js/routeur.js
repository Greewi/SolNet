import { Ecran } from "./ecrans/ecran";
import { Sommaire } from "./ui/sommaire";
import { InterfaceGenerale } from "./ui/interfaceGenerale";
import { Page } from "./pages/page";

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
    }

    /**
     * Ouvre un écran en l'empile
     * @param {Ecran} ecran l'écran à ouvrer
     */
    static empileEcran(ecran) {
        if (this._getEcranActuel())
            this._getEcranActuel().ferme(Page.NOUVEL_ECRAN);
        _pileEcrans.push(ecran);
        this._getEcranActuel().ouvre(null, Page.NOUVEL_ECRAN);
        this._metAJourNavigation();
    }

    /**
     * Ferme un écran et dépile tous les écrans au dessus delui (lui y compris)
     */
    static depileEcran(ecran) {
        let indexEcran = _pileEcrans.indexOf(ecran);
        this.depileJusqueEcran(_pileEcrans[indexEcran - 1]);
    }

    /**
     * Rouvre un écran et dépile tous les écrans au dessus de lui.
     * @param {Ecran} ecran l'écran à rouvrir
     */
    static depileJusqueEcran(ecran) {
        if (ecran == this._getEcranActuel()) {
            ecran.ouvre(null, Page.RECULER);
            return;
        }

        let indexEcran = _pileEcrans.indexOf(ecran);
        if (indexEcran == -1)
            return;
        if (this._getEcranActuel())
            this._getEcranActuel().ferme(Page.RETOUR_ECRAN);
        while (_pileEcrans.length > indexEcran + 1)
            this._depileUnEcran();
        window._pileEcrans = _pileEcrans;
        this._getEcranActuel().ouvre(null, Page.RETOUR_ECRAN);
        this._metAJourNavigation();
    }

    static _depileUnEcran() {
        let ecran = _pileEcrans.pop();
        if (ecran)
            setTimeout(() => ecran.detruit(), 500);
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
        let filAriane = new Sommaire("FilAriane");
        for (let ecran of _pileEcrans) {
            let titre = ecran.getTitre();
            if (titre == null)
                continue;
            let symbole = ecran == this._getEcranActuel() ? "#" : "<";
            let action = () => this.depileJusqueEcran(ecran);
            filAriane.ajoute(titre, symbole, action);
        }
        InterfaceGenerale.setFilAriane(filAriane);
    }
};