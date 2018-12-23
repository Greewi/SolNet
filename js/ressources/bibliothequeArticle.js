import { Ajax } from "../ajax";
import { Lang } from "../lang";
import { BibliothequeDonnees } from "./donneeSources";
import { Loader } from "../loader";

/**
 * Gère et instancie les articles
 */
export class BibliothequeArticle{
    /**
     * Initialise la banque des articles
     * @returns {Promise}
     */
    static initialise(){
        this._article = {};
        var promises = [];
        var encyclopedie = BibliothequeDonnees.encyclopedie;
        for(let idSection in encyclopedie)
        {
            var section = encyclopedie[idSection];
            promises.push(this._chargeArticle(idSection));
            for(let idArticle of section)
                promises.push(this._chargeArticle(idArticle));
        }
        Loader.setNombreSousEtape(promises.length);
        return Promise.all(promises);
    };

    /**
     * Récupère le contenu d'un article
     * @param {HTMLTemplateElement} idArticle L'id de l'article
     */
    static getArticle(idArticle){
        return this._article[idArticle];
    };

    /**
     * Charge un article dans la banque d'article
     * @param {string} idArticle L'id de l'article 
     */
    static _chargeArticle(idArticle){
        return Promise.resolve()
        .then(()=>{
            return Ajax.get(`./localisation/${Lang.getCodeLangue()}/articles/${idArticle}.html`);
        }).then((html)=>{
            let article = document.createElement("template");
            article.innerHTML = html;
            this._article[idArticle] = article;
            console.log(`Article ${idArticle} chargé`);
            Loader.termineSousEtape();
        });
    }
};