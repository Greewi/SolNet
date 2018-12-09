import { Ajax } from "./ajax";

var _roles = null;
var _carrieres = null;
var _carrieresParRole = null;
var _intelligences = null;
var _enveloppes = null;
var _genres = null;
var _factions = null;
var _modifications = null;
var _equipements = null;
var _logiciels = null;

/**
 * Charge et gère les données de l'application
 */
export class BanqueDonnees {
    /**
     * Initialise la banque de donnée
     * @returns {Promise}
     */
    static initialise(){
        return Promise.resolve()
        .then(()=>{
            console.log("Début chargement roles");
            return Ajax.get("./res/roles.json");
        })
        .then((json)=>{
            _roles = JSON.parse(json);
            _carrieresParRole = {};
            for(let idRole in _roles)
                _carrieresParRole[idRole] = [];
            console.log("Roles chargés");
        })
        .then(()=>{
            console.log("Début chargement carrieres");
            return Ajax.get("./res/carrieres.json");
        })
        .then((json)=>{
            _carrieres = JSON.parse(json);
            for(let idCarriere in _carrieres)
            {
                let carriere = _carrieres[idCarriere];
                for(let role of carriere.roles)
                    if(_carrieresParRole[role])
                        _carrieresParRole[role].push(carriere);
                    else
                        console.error(`Carrière ${idCarriere} possède un rôle invalide : ${role}`)
            }
            console.log("Carrières chargés");
        })
        .then(()=>{
            console.log("Début chargement intelligences");
            return Ajax.get("./res/intelligences.json");
        })
        .then((json)=>{
            _intelligences = JSON.parse(json);
            console.log("Intelligences chargées");
        })
        .then(()=>{
            console.log("Début chargement enveloppes");
            return Ajax.get("./res/enveloppes.json");
        })
        .then((json)=>{
            _enveloppes = JSON.parse(json);
            console.log("Enveloppes chargées");
        })
        .then(()=>{
            console.log("Début chargement genres");
            return Ajax.get("./res/genres.json");
        })
        .then((json)=>{
            _genres = JSON.parse(json);
            console.log("Genres chargés");
        })
        .then(()=>{
            console.log("Début chargement factions");
            return Ajax.get("./res/factions.json");
        })
        .then((json)=>{
            _factions = JSON.parse(json);
            console.log("Factions chargées");
        })
        .then(()=>{
            console.log("Début chargement modifications");
            return Ajax.get("./res/modifications.json");
        })
        .then((json)=>{
            _modifications = JSON.parse(json);
            console.log("Modifications chargées");
        })
        .then(()=>{
            console.log("Début chargement équipements");
            return Ajax.get("./res/equipements.json");
        })
        .then((json)=>{
            _equipements = JSON.parse(json);
            console.log("Equipements chargées");
        })
        .then(()=>{
            console.log("Début chargement logiciels");
            return Ajax.get("./res/logiciels.json");
        })
        .then((json)=>{
            _logiciels = JSON.parse(json);
            console.log("Logiciels chargées");
        })
    }

    static get roles(){
        return _roles;
    }

    static get carrieres(){
        return _carrieres;
    }

    static get intelligences(){
        return _intelligences;
    }

    static get enveloppes(){
        return _enveloppes;
    }

    static get genres(){
        return _genres;
    }

    static get factions(){
        return _factions;
    }

    static get modifications(){
        return _modifications;
    }

    static get equipements(){
        return _equipements;
    }

    static get logiciels(){
        return _logiciels;
    }
}