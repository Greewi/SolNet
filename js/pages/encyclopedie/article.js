import { Page } from "../page";
import { Ecran } from "../../ecrans/ecran";
import { BibliothequeArticle } from "../../ressources/bibliothequeArticle";

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
            var contenuPage = this.element.querySelector(".page__contenu");
            contenuPage.appendChild(article.content.cloneNode(true));
        }
    }
}