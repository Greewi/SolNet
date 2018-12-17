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
        Loader.setNombreSousEtape(10);        
        return Promise.resolve()
        .then(()=>{
            console.log("Début chargement roles");
            return Ajax.get("./res/roles.json");
        })
        .then((json)=>{
            this._roles = JSON.parse(json);
            this._carrieresParRole = {};
            for(let idRole in this._roles)
                this._carrieresParRole[idRole] = [];
            console.log("Roles chargés");
            Loader.termineSousEtape();
        })
        .then(()=>{
            console.log("Début chargement carrieres");
            return Ajax.get("./res/carrieres.json");
        })
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
        .then(()=>{
            console.log("Début chargement intelligences");
            return Ajax.get("./res/intelligences.json");
        })
        .then((json)=>{
            this._intelligences = JSON.parse(json);
            console.log("Intelligences chargées");
            Loader.termineSousEtape();
        })
        .then(()=>{
            console.log("Début chargement enveloppes");
            return Ajax.get("./res/enveloppes.json");
        })
        .then((json)=>{
            this._enveloppes = JSON.parse(json);
            console.log("Enveloppes chargées");
            Loader.termineSousEtape();
        })
        .then(()=>{
            console.log("Début chargement genres");
            return Ajax.get("./res/genres.json");
        })
        .then((json)=>{
            this._genres = JSON.parse(json);
            console.log("Genres chargés");
            Loader.termineSousEtape();
        })
        .then(()=>{
            console.log("Début chargement factions");
            return Ajax.get("./res/factions.json");
        })
        .then((json)=>{
            this._factions = JSON.parse(json);
            console.log("Factions chargées");
            Loader.termineSousEtape();
        })
        .then(()=>{
            console.log("Début chargement modifications");
            return Ajax.get("./res/modifications.json");
        })
        .then((json)=>{
            this._modifications = JSON.parse(json);
            console.log("Modifications chargées");
            Loader.termineSousEtape();
        })
        .then(()=>{
            console.log("Début chargement équipements");
            return Ajax.get("./res/equipements.json");
        })
        .then((json)=>{
            this._equipements = JSON.parse(json);
            console.log("Equipements chargées");
            Loader.termineSousEtape();
        })
        .then(()=>{
            console.log("Début chargement logiciels");
            return Ajax.get("./res/logiciels.json");
        })
        .then((json)=>{
            this._logiciels = JSON.parse(json);
            console.log("Logiciels chargées");
            Loader.termineSousEtape();
        })
        .then(()=>{
            console.log("Début chargement encyclopedie");
            return Ajax.get("./res/encyclopedie.json");
        })
        .then((json)=>{
            this._encyclopedie = JSON.parse(json);
            console.log("Encyclopédie chargées");
            Loader.termineSousEtape();
        })
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