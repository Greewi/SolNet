import { Ecran } from "./ecran";

/**
 * Écran représentant une section de l'encyclopédie
 */
export class EcranEncyclopedie extends Ecran{
    /**
     * @param {string} premierePage La première page
     * @param {Object<string:Page>} pages Les pages de la section
     */
    constructor(premierePage, pages){
        super();
        super.setPages(pages);
        super.setPageParDefaut(premierePage);
    }
}