import { Lang } from "./lang";
import { BibliothequeDonnees as BibliothequeDonnees } from "./ressources/donneeSources";
import { BibliothequeTemplates } from "./ressources/templates";
import { BibliothequePersonnage } from "./ressources/bibliothequePersonnage";
import { Routeur } from "./routeur";
import { Footer } from "./footer";
import { BibliothequeArticle } from "./ressources/bibliothequeArticle";
import { EcranAccueil } from "./ecrans/ecranAccueil";
import { Loader } from "./loader";
import { BibliothequeThemes } from "./ressources/themes";

Loader.initialise();
Loader.setNombreEtape(6);

Promise.resolve()
.then(()=>{
    return Lang.initialise("fr");
})
.then(()=>{
    Loader.termineEtape();
    return BibliothequeDonnees.initialise();
})
.then(()=>{
    Loader.termineEtape();
    return BibliothequeTemplates.initialise();
})
.then(()=>{
    Loader.termineEtape();
    return BibliothequeArticle.initialise();
})
.then(()=>{
    Loader.termineEtape();
    return BibliothequeThemes.initialise();
})
.then(()=>{
    Loader.termineEtape();
    BibliothequePersonnage.initialise();
    Loader.termineEtape();
})
.then(()=>{
    Footer.initialise();
    Footer.affiche();
})
.then(()=>{
    Routeur.initialise();
})
.then(() => {
    var ecran = new EcranAccueil();
    Routeur.ouvreEcran(ecran);
    Loader.termineChargement();
})
.catch((e) => {
    console.error(e);
});
