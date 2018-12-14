import { Ecran } from "./ecrans/ecran";

/**
 * @type {Ecran}
 */
let _ecranActuel = null;

/**
 * Gère l'ouverture et la fermeture des écrans
 */
export class Routeur{
    /**
     * Ouvre un écran et ferme l'actuel
     * @param {Ecran} ecran 
     */
    static ouvreEcran(ecran){
        if(_ecranActuel != null)
            _ecranActuel.ferme();
        _ecranActuel = ecran;
        _ecranActuel.ouvre();
    }

    /**
     * @deprecated Uniquement pour des besoins de debug !
     */
    static getEcranActuel()
    {
        return _ecranActuel;
    }
};