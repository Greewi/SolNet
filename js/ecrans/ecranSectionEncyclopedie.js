import { Ecran } from "./ecran";
import { BibliothequeDonnees } from "../ressources/donneeSources";
import { PageArticle } from "../pages/encyclopedie/article";
import { PageSection } from "../pages/encyclopedie/section";
import { EcranEncyclopedie } from "./ecranEncyclopedie";
import { Routeur } from "../routeur";

/**
 * Écran représentant une section de l'encyclopédie
 */
export class EcranSectionEncyclopedie extends Ecran{
    /**
     * @param {string} idSection l'id de la section
     */
    constructor(idSection){
        super();

        this._idSection = idSection;

        let pages = {};
        let ordrePage = [];

        // Sommaire
        pages[idSection] = new PageSection(this, idSection);
        ordrePage.push(idSection);
        
        // Articles
        let section = BibliothequeDonnees.encyclopedie[idSection];
        for(let idArticle of section)
        {
            pages[idArticle] = new PageArticle(this, idArticle);
            ordrePage.push(idArticle);
        }
        
        super.setPages(pages);
        super.setOrdrePages(ordrePage);
        super.setPageParDefaut(idSection);
        super.setActionRetour(()=>{
            Routeur.ouvreEcran(new EcranEncyclopedie());
        });
    }

    /**
     * @override
     * @inheritdoc
     */
    ouvre(page, avancer){
        if(!page || page==this._idSection)
        {
            super.setActionRetour(()=>{
                Routeur.ouvreEcran(new EcranEncyclopedie());
            });
        }
        else
        {
            super.setActionRetour(()=>{
                this.ouvre(this._idSection, false);
            });
        }
        super.ouvre(page, avancer);
    }
}