import { Lang } from "./lang";
import { BibliothequeDonnees as BibliothequeDonnees } from "./ressources/donneeSources";
import { BibliothequeTemplates } from "./ressources/templates";
import { BibliothequePersonnage } from "./ressources/bibliothequePersonnage";
import { Routeur } from "./routeur";
import { Footer } from "./footer";
import { BibliothequeArticle } from "./ressources/bibliothequeArticle";
import { EcranAccueil } from "./ecrans/ecranAccueil";

Promise.resolve()
.then(()=>{
    return Lang.initialise("fr");
})
.then(()=>{
    return BibliothequeDonnees.initialise();
})
.then(()=>{
    return BibliothequeTemplates.initialise();
})
.then(()=>{
    return BibliothequeArticle.initialise();
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
    var ecran = new EcranAccueil();
    Routeur.ouvreEcran(ecran);
})
.catch((e) => {
    console.error(e);
});
