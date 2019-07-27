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
import { InterfaceGenerale } from "./ui/interfaceGenerale";
import { NotificationInstallation } from "./notifications/notificationInstallation";
import { NotificationMiseAJour } from "./notifications/notificationMiseAJour";
import { ProgressiveWebApp } from "./progressiveWebApp";

ProgressiveWebApp.initialise();

Loader.initialise();
Loader.setNombreEtape(6);

Promise.resolve()
    .then(() => {
        return Lang.initialise("fr");
    })
    .then(() => {
        Loader.termineEtape();
        return BibliothequeDonnees.initialise();
    })
    .then(() => {
        Loader.termineEtape();
        return BibliothequeTemplates.initialise();
    })
    .then(() => {
        Loader.termineEtape();
        return BibliothequeArticle.initialise();
    })
    .then(() => {
        Loader.termineEtape();
        return BibliothequeThemes.initialise();
    })
    .then(() => {
        Loader.termineEtape();
        BibliothequePersonnage.initialise();
        Loader.termineEtape();
    })
    .then(() => {
        Footer.initialise();
        Footer.affiche();
    })
    .then(() => {
        InterfaceGenerale.initialise();
        Routeur.initialise();
        new NotificationInstallation();
        new NotificationMiseAJour(window.serviceWorkerSolNet);
    })
    .then(() => {
        var ecran = new EcranAccueil();
        Routeur.ouvreEcran(ecran);
        Loader.termineChargement();
    })
    .catch((e) => {
        console.error(e);
    });
