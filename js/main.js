import { EcranCreationPersonnage } from "./ecrans/ecranCreationPersonnage";
import { Personnage } from "./personnages/personnage";
import { BanqueDonnees } from "./personnages/donneeSources";
import { Lang } from "./lang";

Promise.resolve()
.then(()=>{
    return Lang.initialise("fr");
})
.then(()=>{
    return BanqueDonnees.initialise();
})
.then(() => {
    var ecran = new EcranCreationPersonnage(new Personnage());
    ecran.ouvre();
    window.ecran = ecran;
})
.catch((e) => {
    console.error(e);
});
