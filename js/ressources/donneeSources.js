import { Ajax } from "../ajax";
import { Loader } from "../loader";

/**
 * Charge et gère les données de l'application
 */
export class BibliothequeDonnees {
    /**
     * Initialise la banque de donnée
     * @returns {Promise}
     */
    static initialise(){   
        var promises = [];
        promises.push(
            Ajax.get("./res/roles.json")
            .then((json)=>{
                this._roles = JSON.parse(json);
                this._carrieresParRole = {};
                for(let idRole in this._roles)
                    this._carrieresParRole[idRole] = [];
                console.log("Roles chargés");
                Loader.termineSousEtape();
            })
        );
        promises.push(
            Ajax.get("./res/carrieres.json")
            .then((json)=>{
                this._carrieres = JSON.parse(json);
                for(let idCarriere in this._carrieres)
                {
                    let carriere = this._carrieres[idCarriere];
                    for(let role of carriere.roles)
                        if(this._carrieresParRole[role])
                            this._carrieresParRole[role].push(carriere);
                        else
                            console.error(`Carrière ${idCarriere} possède un rôle invalide : ${role}`)
                }
                console.log("Carrières chargés");
                Loader.termineSousEtape();
            })
        );
        promises.push(
            this._chargeDonnee("Intelligences", "./res/intelligences.json", "_intelligences")
        );
        promises.push(
            this._chargeDonnee("Enveloppes", "./res/enveloppes.json", "_enveloppes")
        );
        promises.push(
            this._chargeDonnee("Genres", "./res/genres.json", "_genres")
        );
        promises.push(
            this._chargeDonnee("Factions", "./res/factions.json", "_factions")
        );
        promises.push(
            this._chargeDonnee("Modifications", "./res/modifications.json", "_modifications")
        );
        promises.push(
            this._chargeDonnee("Equipements", "./res/equipements.json", "_equipements")
        );
        promises.push(
            this._chargeDonnee("Logiciels", "./res/logiciels.json", "_logiciels")
        );
        promises.push(
            this._chargeDonnee("Encyclopedie", "./res/encyclopedie.json", "_encyclopedie")
        );
        
        Loader.setNombreSousEtape(promises.length);
        return Promise.all(promises);
    }

    static _chargeDonnee(nom, fichier, propriete){
        return Ajax.get(fichier)
        .then((json)=>{
            this[propriete] = JSON.parse(json);
            console.log(`${nom} chargé`);
            Loader.termineSousEtape();
        });
    }

    static get roles(){
        return this._roles;
    }

    static get carrieres(){
        return this._carrieres;
    }

    static get intelligences(){
        return this._intelligences;
    }

    static get enveloppes(){
        return this._enveloppes;
    }

    static get genres(){
        return this._genres;
    }

    static get factions(){
        return this._factions;
    }

    static get modifications(){
        return this._modifications;
    }

    static get equipements(){
        return this._equipements;
    }

    static get logiciels(){
        return this._logiciels;
    }

    static get encyclopedie(){
        return this._encyclopedie;
    }
}