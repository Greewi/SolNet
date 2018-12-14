import { Utils } from "./utils";
import { Personnage } from "./personnages/personnage";
import { Lang } from "./lang";

/**
 * Ce singleton gère la bibliothèque des personnages et les stocke dans le local storage.
 */
export class BibliothequePersonnage{

    /**
     * @returns {string[]} La liste des personnages
     */
    static getListePersonnages(){
        let liste = Utils.parseJSON(localStorage.getItem(`personnage_liste`));
        if(!liste)
            liste={};
        return liste;
    }

    /**
     * Récupère un personnage dans la liste des personnages
     * @param {number} index Le numéro du personnage dans la base
     * @returns {Personnage} Le personnage correspondant
     */
    static getPersonnage(index){
        let json = Utils.parseJSON(localStorage.getItem(`personnage_${index}`));
        if(json == null)
            return null;
        return BibliothequePersonnage.parsePersonnageV1(json);
    }

    /**
     * Créé un nouveau personnage
     * @returns {Personnage} Le personnage créé
     */
    static creePersonnage(){
        let personnage = new Personnage(BibliothequePersonnage.genereIDPersonnage());
        personnage.identite.pseudonyme = Lang.get("NomNouveauPersonnage");
        BibliothequePersonnage.ajoutePersonnage(personnage);
        return personnage;
    }

    /**
     * Ajoute un personnage dans la bibliotheque.
     * Si un personnage possède déjà le même id, un nouvel id lui sera attribué.
     * @param {Personnage} personnage Le personnage à ajouter.
     */
    static ajoutePersonnage(personnage){
        let liste = Utils.parseJSON(localStorage.getItem(`personnage_liste`));
        if(!liste)
            liste={};
        if(liste[personnage.id])
            personnage.id = BibliothequePersonnage.genereIDPersonnage();
        liste[personnage.id] = personnage.identite.pseudonyme;
        localStorage.setItem(`personnage_liste`, JSON.stringify(liste));
        localStorage.setItem(`personnage_${personnage.id}`, JSON.stringify(personnage));
    }

    /**
     * Supprime un personnage de la bibliothèque.
     * @param {number} idPersonnage l'id du personnage à supprimer
     */
    static retirePersonnage(idPersonnage){
        let liste = Utils.parseJSON(localStorage[`personnage_liste`]);
        if(!liste)
            liste={};
        delete liste[idPersonnage];
        localStorage.setItem(`personnage_liste`, JSON.stringify(liste));
        localStorage.removeItem(`personnage_${idPersonnage}`);
    }

    /**
     * Génère un nouvel id de personnage
     */
    static genereIDPersonnage(){
        let id = localStorage.getItem("personnage_next_id");
        id = id ? parseInt(id)+1 : 1;
        localStorage.setItem("personnage_next_id", id);
        return id;
    }

    /**
     * Reconstruit un personnage à partir de son export JSON
     * @param {*} json Le json à parser
     * @returns {Personnage} Le personnage reconstruit
     */
    static parsePersonnageV1(json){
        let personnage = new Personnage(json.id);

        //Roles
        personnage.roles = json.roles;

        //Elements
        let parseElements = function(listeSrc, listeDest){
            for(let element of listeSrc)
                listeDest.push(new Element(element.id, element.type, element.nom, element.score))
        }
        parseElements(json.elements.traits, personnage.elements.traits);
        parseElements(json.elements.carrieres, personnage.elements.carrieres);
        parseElements(json.elements.relations, personnage.elements.relations);
        parseElements(json.elements.modifications, personnage.elements.modifications);
        parseElements(json.elements.equipements, personnage.elements.equipements);
        parseElements(json.elements.logiciels, personnage.elements.logiciels);

        //Identite
        personnage.identite.pseudonyme = json.identite.pseudonyme;
        personnage.identite.nomAdministratif = json.identite.nomAdministratif;
        personnage.identite.profession = json.identite.profession;
        personnage.identite.affiliation = json.identite.affiliation;
        personnage.identite.genre = json.identite.genre;
        personnage.identite.natureEsprit = json.identite.natureEsprit;
        personnage.identite.enveloppeUsuelle = json.identite.enveloppeUsuelle;

        //Descriptions
        personnage.description.premiereImpression = json.description.premiereImpression;
        personnage.description.corps = json.description.corps;
        personnage.description.visage = json.description.visage;
        personnage.avatar.premiereImpression = json.avatar.premiereImpression;
        personnage.avatar.corps = json.avatar.corps;
        personnage.avatar.visage = json.avatar.visage;

        //Motivation
        personnage.motivation = json.motivation;

        //Opinions
        //TODO

        //Histoire
        //TODO

        //Intrigue
        //TODO
        personnage.intriguePersonnage.objectif = json.intriguePersonnage.objectif;
        personnage.intriguePersonnage.recompense = json.intriguePersonnage.recompense;
        personnage.intriguePersonnage.etapeActuelle = json.intriguePersonnage.etapeActuelle;
        personnage.intriguePersonnage.nombreEtape = json.intriguePersonnage.nombreEtape;
        personnage.intriguePersonnage.prochaineEtape = json.intriguePersonnage.prochaineEtape;
        
        //Points personages
        personnage.pointPersonnage = json.pointPersonnage;
        personnage.maxPointPersonnage = json.maxPointPersonnage;

        return personnage;
    }



    
    /**
     * https://stackoverflow.com/questions/34034475/edit-and-save-a-file-locally-with-js
     * 
     * @param {*} e Event provenant du onchange d'un input[type=file]
     */
    _importePersonnage(e){
        var reader = new FileReader();
        reader.onload = function(event) {
            var json = JSON.parse(event.target.result);
        }
        reader.readAsText(new Blob([e.target.files[0]], {
            "type": "application/json"
        }));
    }

    /**
     * 
     * @param {Personnage} personnage 
     */
    _exportePersonnage(personnage){
        var json = JSON.stringify(personnage);
        var blob = new Blob([json], {
            "type": "application/json"
        });
        var a = document.createElement("a");
        a.download = `${personnage.identite.pseudonyme}.json`;
        a.href = URL.createObjectURL(blob);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}