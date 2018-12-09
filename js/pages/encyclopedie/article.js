import { Page } from "../page";
import { Ecran } from "../../ecrans/ecran";

/**
 * Page d'article de l'encyclopédie
 */
export class PageArticle extends Page{
    /**
     * @param {Ecran} ecran L'écran auquel cette page est rattachée
     */
    constructor(ecran, article){
        this._nom = article.nom;
        this._titre = article.titre;
        this._texte = article.texte;
        super(`sommaire_${this._nom}`, ecran);
    }
}