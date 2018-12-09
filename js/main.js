import { EcranCreationPersonnage } from "./ecrans/ecranCreationPersonnage";
import { Personnage } from "./personnages/personnage";
import { BanqueDonnees } from "./donneeSources";
import { Lang } from "./lang";
import { Templates } from "./templates";

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
    var ecran = new EcranCreationPersonnage(new Personnage());
    ecran.ouvre();
    window.ecran = ecran;
})
.catch((e) => {
    console.error(e);
});
