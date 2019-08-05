import { Page } from "../page";
import { Ecran } from "../../ecrans/ecran";
import { BibliothequeDonnees } from "../../ressources/donneeSources";
import { BibliothequeArticle } from "../../ressources/bibliothequeArticle";
import { EcranSectionEncyclopedie } from "../../ecrans/ecranSectionEncyclopedie";
import { Routeur } from "../../routeur";
import { Sommaire } from "../../ui/sommaire";

/**
 * Page racine de l'encyclopédie
 */
export class PageRacine extends Page {
    /**
     * @param {Ecran} ecran L'écran auquel cette page est rattachée
     */
    constructor(ecran) {
        super("pageEncyclopedieRacine", ecran);

        this._listeSommaire = this.element.querySelector("#sommaireEncyclopedie");
        this._sommaire = new Sommaire();
        let encyclopedie = BibliothequeDonnees.encyclopedie;
        for (let idSection in encyclopedie) {
            let article = BibliothequeArticle.getArticle(idSection);
            if (article) {
                let titre = article.content.querySelector("h1").innerHTML;
                let bouton = document.createElement("button");
                bouton.innerHTML = titre;
                bouton.className = "page__bouton page__bouton__pleine_largeur";
                bouton.onclick = () => {
                    Routeur.empileEcran(new EcranSectionEncyclopedie(idSection));
                };
                this._listeSommaire.appendChild(bouton);
                this._sommaire.ajoute(titre, ">", () => bouton.onclick());
            }
        }
    }
}