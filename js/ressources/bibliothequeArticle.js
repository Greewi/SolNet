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

        let nombre = 0;
        for(let idSection in encyclopedie)
        {
            nombre++;
            for(let idArticle of section)
                nombre++;
        }
        Loader.setNombreSousEtape(nombre);

        var promise = Promise.resolve();
        var encyclopedie = BibliothequeDonnees.encyclopedie;
        for(let idSection in encyclopedie)
        {
            var section = encyclopedie[idSection];
            promise = promise.then(()=>{
                return this._chargeArticle(idSection);
            });

            for(let idArticle of section)
            {
                promise = promise.then(()=>{
                    return this._chargeArticle(idArticle);
                });    
            }
        }
        return promise;
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
            console.log(`Début chargement article ${idArticle}`);
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