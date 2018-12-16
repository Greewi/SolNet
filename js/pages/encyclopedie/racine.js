import { Page } from "../page";
import { Ecran } from "../../ecrans/ecran";
import { BibliothequeDonnees } from "../../ressources/donneeSources";
import { BibliothequeArticle } from "../../ressources/bibliothequeArticle";
import { EcranSectionEncyclopedie } from "../../ecrans/ecranSectionEncyclopedie";
import { Routeur } from "../../routeur";

/**
 * Page racine de l'encyclopédie
 */
export class PageRacine extends Page{
    /**
     * @param {Ecran} ecran L'écran auquel cette page est rattachée
     */
    constructor(ecran){
        super("pageEncyclopedieRacine", ecran);

        this._listeSommaire = this.element.querySelector("#sommaireEncyclopedie");

        let encyclopedie = BibliothequeDonnees.encyclopedie;
        for(let idSection in encyclopedie)
        {
            let article = BibliothequeArticle.getArticle(idSection);
            if(article)
            {
                var titre = article.content.querySelector("h1").innerHTML;
                var bouton = document.createElement("button");
                bouton.innerHTML = titre;
                bouton.className = "page__bouton page__bouton__pleine_largeur";
                bouton.onclick = ()=>{
                    let ecran = new EcranSectionEncyclopedie(idSection);
                    Routeur.ouvreEcran(ecran);
                };
                this._listeSommaire.appendChild(bouton);
            }
        }
    }
}