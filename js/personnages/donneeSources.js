import { Ajax } from "../ajax";

var _roles = null;
var _carrieres = null;
var _carrieresParRole = null;
var _intelligences = null;
var _enveloppes = null;
var _genres = null;

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
}