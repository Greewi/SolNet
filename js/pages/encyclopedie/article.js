import { Page } from "../page";
import { Ecran } from "../../ecrans/ecran";
import { BibliothequeArticle } from "../../ressources/bibliothequeArticle";
import { InterfaceGenerale } from "../../ui/interfaceGenerale";

/**
 * Page d'article de l'encyclopédie
 */
export class PageArticle extends Page{
    /**
     * @param {Ecran} ecran L'écran auquel cette page est rattachée
     */
    constructor(ecran, idArticle){
        super("pageEncyclopedieArticle", ecran);

        let article = BibliothequeArticle.getArticle(idArticle);
        if(article)
        {
            let contenuPage = this.element.querySelector(".page__contenu");
            contenuPage.appendChild(article.content.cloneNode(true));
            this.getTitre();
            this.getSommaire();
        }
    }
}