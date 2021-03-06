import { Page } from "../page";
import { Ecran } from "../../ecrans/ecran";
import { BibliothequeDonnees } from "../../ressources/donneeSources";
import { BibliothequeArticle } from "../../ressources/bibliothequeArticle";
import { Sommaire } from "../../ui/sommaire";

/**
 * Page sommaire d'une section de l'encyclopédie
 */
export class PageSection extends Page {
    /**
     * @param {Ecran} ecran L'écran auquel cette page est rattachée
     */
    constructor(ecran, idSection) {
        super("pageEncyclopedieSection", ecran);

        let section = BibliothequeDonnees.encyclopedie[idSection];

        // Sommaire        
        this._listeSommaire = this.element.querySelector("#sommaireSection");
        this._sommaire = new Sommaire();
        for (let idArticle of section) {
            let article = BibliothequeArticle.getArticle(idArticle);
            if (article) {
                let titre = article.content.querySelector("h1").innerHTML;
                let bouton = document.createElement("button");
                bouton.innerHTML = titre;
                bouton.className = "page__bouton page__bouton__pleine_largeur";
                bouton.onclick = () => {
                    ecran.ouvre(idArticle, Page.AVANCER);
                };
                this._listeSommaire.appendChild(bouton);
                this._sommaire.ajoute(titre, ">", () => bouton.onclick());
            }
        }

        // Texte de la section
        let articleSection = BibliothequeArticle.getArticle(idSection);
        if (articleSection) {
            let contenuPage = this.element.querySelector(".page__contenu");
            contenuPage.insertBefore(articleSection.content.cloneNode(true), this._listeSommaire);
        }
    }
}