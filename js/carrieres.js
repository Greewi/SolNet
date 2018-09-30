
 let _roles = null;
 let _carrieres = null;
 let _carrieresParRole = {};

 /**
  * Classe offrant un certain nombre de méthode pour gérer et sélectionner des carrières
  */
export class Carrieres{
    /**
     * @returns {Promise} une promise résolue une fois le chargement terminé
     */
    static initialise(){
        return Promise.resolve()
        .then(()=>{
            console.log("Début chargement roles");
            return Ajax.get("./res/roles.json");
        })
        .then((json)=>{
            console.log("Roles chargés");
            _roles = JSON.parse(json);
            for(let idRole in _roles)
                _carrieresParRole[idRole] = [];
            console.log("Roles enregistrés");
        })
        .then(()=>{
            console.log("Début chargement carrieres");
            return Ajax.get("./res/carrieres.json");
        })
        .then((json)=>{
            console.log("Carrières chargés");
            _carrieres = JSON.parse(json);
            for(let idCarriere in _carrieres)
            {
                let carriere = _carrieres[idCarriere];
                for(let role of carriere.roles)
                {
                    if(_carrieresParRole[role])
                        _carrieresParRole[role].push(carriere);
                    else
                        console.error(`Carrière ${idCarriere} possède un rôle invalide : ${role}`)
                }
            }
            console.log("Carrières enregistrés");
        })
    }

    /**
     * 
     * @param {*} roles 
     * @param {*} tolerance 
     */
    static getCarrieresPourRoles(roles, tolerance)
    {

    }
}
