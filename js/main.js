import { EcranCreationPersonnage } from "./ecrans/ecranCreationPersonnage";
import { Personnage } from "./personnages/personnage";
import { BanqueDonnees } from "./donneeSources";
import { Lang } from "./lang";
import { Templates } from "./templates";
import { EcranGestionPersonnage } from "./ecrans/ecranGestionPersonnage";
import { Routeur } from "./routeur";

Promise.resolve()
.then(()=>{
    return Lang.initialise("fr");
})
.then(()=>{
    return BanqueDonnees.initialise();
})
.then(()=>{
    return Templates.initialise();
})
.then(() => {
    Templates.log();
    var ecran = new EcranGestionPersonnage();
    Routeur.ouvreEcran(ecran);
})
.catch((e) => {
    console.error(e);
});
