export class Element{
    /**
     * @param {string} id 
     * @param {string} type
     * @param {string} nom 
     * @param {number} score 
     */
    constructor(id, type, nom, score)
    {
        this.id = id;
        this.type = type;
        this.nom = nom;
        this.score = score;
    }
}

Element.CARRIERE_BASE = "CARRIERE_BASE"
Element.CARRIERE_PERSO = "CARRIERE_PERSO"
Element.RELATION_BASE = "RELATION_BASE"
Element.RELATION_PERSO = "RELATION_PERSO"
Element.TRAIT_ENVELOPPE = "TRAIT_ENVELOPPE"
Element.TRAIT_ESPRIT = "TRAIT_ESPRIT"
Element.TRAIT_PHYSIQUE = "TRAIT_PHYSIQUE"
Element.TRAIT_CARACTERE = "TRAIT_CARACTERE"