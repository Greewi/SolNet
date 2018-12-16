import { Lang } from "./lang";
import { BanqueDonnees } from "./donneeSources";
import { Templates } from "./templates";
import { BibliothequePersonnage } from "./bibliothequePersonnage";
import { Routeur } from "./routeur";
import { EcranGestionPersonnage } from "./ecrans/ecranGestionPersonnage";
import { Footer } from "./footer";

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
.then(()=>{
    BibliothequePersonnage.initialise();
})
.then(()=>{
    Footer.initialise();
    Footer.affiche();
})
.then(()=>{
    Routeur.initialise();
})
.then(() => {
    var ecran = new EcranGestionPersonnage();
    Routeur.ouvreEcran(ecran);
})
.catch((e) => {
    console.error(e);
});
