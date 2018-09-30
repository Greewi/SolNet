import {Ajax} from '../js/ajax.js';

export class TestCombinaisons {
    constructor(){
        this._roles = null;
        this._carrieres = null;
        this._carrieresParRole = {};
    }

    charge(){
        return Promise.resolve()
        .then(()=>{
            console.log("Début chargement roles");
            return Ajax.get("./res/roles.json");
        })
        .then((json)=>{
            console.log("Roles chargés");
            this._roles = JSON.parse(json);
            for(let idRole in this._roles)
                this._carrieresParRole[idRole] = [];
            console.log("Roles enregistrés");
        })
        .then(()=>{
            console.log("Début chargement carrieres");
            return Ajax.get("./res/carrieres.json");
        })
        .then((json)=>{
            console.log("Carrières chargés");
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
            console.log("Carrières enregistrés");
        })
    }

    testeCombinaisons(){
        let roles = [];
        for(let role in this._roles)
            roles.push(role);

        for(let i1 = 0; i1<roles.length; i1++)
            for(let i2 = i1; i2<roles.length; i2++)
                for(let i3 = i2; i3<roles.length; i3++)
                    this.testeCombinaison(roles[i1], roles[i2], roles[i3]);
    }

    testeCombinaison(role1, role2, role3)
    {
        let carrierePossibles = [];
        let rolesRemplis = {};
        let carrieres = this._carrieresParRole[role1];
        carrieres = carrieres.concat(this._carrieresParRole[role2]);
        carrieres = carrieres.concat(this._carrieresParRole[role3]);

        for(let carriere of carrieres)
        {
            let ok = true;
            for(let role of carriere.roles)
            {
                if(role != role1 && role != role2 && role !=role3)
                {
                    ok=false;
                    break;
                }
            }

            if(ok)
            {
                carrierePossibles.push(carriere);
                for(let role of carriere.roles)
                    rolesRemplis[role] = role;
            }
        }

        if(!rolesRemplis[role1])
            document.body.innerHTML += `<li>Combinaison (${role1}, ${role2}, ${role3}) incomplète !</li>`;
        else if(!rolesRemplis[role2])
            document.body.innerHTML += `<li>Combinaison (${role1}, ${role2}, ${role3}) incomplète !</li>`;
        else if(!rolesRemplis[role2])
            document.body.innerHTML += `<li>Combinaison (${role1}, ${role2}, ${role3}) incomplète !</li>`;
        return {rolesRemplis : rolesRemplis, carrierePossibles : carrierePossibles};
    }
}