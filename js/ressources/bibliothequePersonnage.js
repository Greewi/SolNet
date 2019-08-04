import { Utils } from "../utils";
import { Personnage } from "../personnages/personnage";
import { Lang } from "../lang";
import { Element } from "../personnages/element";
import { Loader } from "../loader";
import { BibliothequeDonnees } from "./donneeSources";
import { PeriodeHistorique } from "../personnages/histoire";
import { PopupConfirmation } from "../ui/popup";

/**
 * Ce singleton gère la bibliothèque des personnages et les stocke dans le local storage.
 */
export class BibliothequePersonnage {

    /**
     * Initialise la bibliothèque des personnages
     */
    static initialise() {
        Loader.setNombreSousEtape(1);
        let liste = Utils.parseJSON(localStorage.getItem(`personnage_liste`));
        if (!liste)
            localStorage.setItem(`personnage_liste`, JSON.stringify({}));
        Loader.termineSousEtape();
    }

    /**
     * @returns {string[]} La liste des personnages
     */
    static getListePersonnages() {
        let liste = Utils.parseJSON(localStorage.getItem(`personnage_liste`));
        return liste;
    }

    /**
     * Récupère un personnage dans la liste des personnages
     * @param {number} index Le numéro du personnage dans la base
     * @returns {Personnage} Le personnage correspondant
     */
    static getPersonnage(index) {
        let json = Utils.parseJSON(localStorage.getItem(`personnage_${index}`));
        if (json == null)
            return null;
        return this.parsePersonnageV1(json);
    }

    /**
     * Créé un nouveau personnage
     * @returns {Personnage} Le personnage créé
     */
    static creePersonnage() {
        let personnage = new Personnage(this.genereIDPersonnage());
        personnage.identite.pseudonyme = Lang.get("NomNouveauPersonnage");
        this.ajoutePersonnage(personnage);
        return personnage;
    }

    /**
     * Ajoute un personnage dans la bibliotheque.
     * Si un personnage possède déjà le même id, un nouvel id lui sera attribué.
     * @param {Personnage} personnage Le personnage à ajouter.
     */
    static ajoutePersonnage(personnage) {
        let liste = Utils.parseJSON(localStorage.getItem(`personnage_liste`));
        if (liste[personnage.id])
            personnage.id = this.genereIDPersonnage();
        liste[personnage.id] = personnage.identite.pseudonyme;
        localStorage.setItem(`personnage_liste`, JSON.stringify(liste));
        localStorage.setItem(`personnage_${personnage.id}`, JSON.stringify(personnage));
    }

    /**
     * Supprime un personnage de la bibliothèque.
     * @param {number} idPersonnage l'id du personnage à supprimer
     */
    static retirePersonnage(idPersonnage) {
        let liste = Utils.parseJSON(localStorage[`personnage_liste`]);
        delete liste[idPersonnage];
        localStorage.setItem(`personnage_liste`, JSON.stringify(liste));
        localStorage.removeItem(`personnage_${idPersonnage}`);
    }

    /**
     * Sauvegarde un personnage
     * @param {Personnage} personnage Le personnage à sauvegarder
     */
    static sauvegardePersonnage(personnage) {
        let liste = Utils.parseJSON(localStorage.getItem(`personnage_liste`));
        liste[personnage.id] = personnage.identite.pseudonyme;
        localStorage.setItem(`personnage_liste`, JSON.stringify(liste));
        localStorage.setItem(`personnage_${personnage.id}`, JSON.stringify(personnage));
    }

    /**
     * Exporte un personnage dans un fichier json
     * @param {string} idPersonnage L'id du personnage à exporter
     */
    static exportePersonnage(idPersonnage) {
        let personnage = this.getPersonnage(idPersonnage);
        let json = JSON.stringify(personnage);
        let blob = new Blob([json], {
            "type": "application/json"
        });
        let a = document.createElement("a");
        a.download = `${personnage.identite.pseudonyme}.json`;
        a.href = URL.createObjectURL(blob);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    /**
     * Importe un personnage depuis un fichier json
     * https://stackoverflow.com/questions/34034475/edit-and-save-a-file-locally-with-js
     * @param {File} fichier Le fichier à charger
     * @param {function} [callback] Une callback appelée une fois le fichier chargé avec succès
     */
    static importePersonnage(fichier, callback) {
        callback = callback || (() => { });
        let reader = new FileReader();
        reader.onload = (event) => {
            try {
                let json = JSON.parse(event.target.result);
                let personnage = this.parsePersonnageV1(json);
                PopupConfirmation.confirme(Lang.get("ConfirmationImportationPersonnage", { "CharacterName": personnage.identite.pseudonyme }), () => {
                    this.ajoutePersonnage(personnage);
                    callback();
                });
            }
            catch (e) {
                console.error(e);
                alert(Lang.get("ErreurChargementFichierPersonnage"));
            }
        }
        reader.readAsText(new Blob([fichier], {
            "type": "application/json"
        }));
    }

    /**
     * Génère un nouvel id de personnage
     */
    static genereIDPersonnage() {
        let id = localStorage.getItem("personnage_next_id");
        id = id ? parseInt(id) + 1 : 1;
        localStorage.setItem("personnage_next_id", id);
        return id;
    }

    /**
     * Reconstruit un personnage à partir de son export JSON
     * @param {*} json Le json à parser
     * @returns {Personnage} Le personnage reconstruit
     */
    static parsePersonnageV1(json) {
        let personnage = new Personnage(json.id);

        //Roles
        personnage.roles = json.roles;

        //Elements
        let parseElements = function (listeSrc, listeDest) {
            for (let element of listeSrc)
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
        for (let idOpinion in BibliothequeDonnees.opinions)
            personnage.opinions[idOpinion] = json.opinions[idOpinion];

        //Histoire
        personnage.histoire.dateNaissance = json.histoire.dateNaissance;
        if (personnage.histoire.dateNaissance.includes("T"))
            personnage.histoire.dateNaissance = personnage.histoire.dateNaissance.split("T")[0];
        personnage.histoire.lieuNaissance = json.histoire.lieuNaissance;
        personnage.histoire.detailNaissance = json.histoire.detailNaissance;
        for (let periodeJson of json.histoire.historique) {
            let periode = new PeriodeHistorique();
            periode.date = periodeJson.date;
            if (periode.date.includes("T"))
                periode.date = periode.date.split("T")[0];
            periode.carrieres = periodeJson.carrieres;
            periode.affiliation = periodeJson.affiliation;
            if(!Array.isArray(periode.affiliation))
                periode.affiliation = [periode.affiliation];
            periode.evenements = periodeJson.evenements;
            personnage.histoire.historique.push(periode);
        }

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
}