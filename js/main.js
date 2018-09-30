import { EcranCreationPersonnage } from "./ecrans/ecranCreationPersonnage";
import { Personnage } from "./personnages/personnage";
import { BanqueDonnees } from "./personnages/donneeSources";

BanqueDonnees.initialise()
.then(() => {
    var ecran = new EcranCreationPersonnage(new Personnage());
    ecran.ouvre();
    window.ecran = ecran;
});
