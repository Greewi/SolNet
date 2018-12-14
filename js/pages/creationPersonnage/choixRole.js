import { Page } from "../page";
import { Ecran } from "../../ecrans/ecran";
import { Personnage } from "../../personnages/personnage";
import { BanqueDonnees } from "../../donneeSources";
import { Selecteur, SelecteurSimple } from "../selecteur";
import { Lang } from "../../lang";

/**
 * Page de choix des rôles du personnage
 */
export class PageChoixRole extends Page{
    /**
     * @param {Ecran} ecran L'écran auquel cette page est rattachée
     * @param {Personnage} personnage Le personnage à créer
     */
    constructor(ecran , personnage, pagePrecedent, pageSuivante){
        super("pageCreationPersonnageRoles", ecran, pagePrecedent, pageSuivante);
        this._personnage = personnage;
        this._rolesPersonnage = personnage.roles;

        this._listeRoles = this.element.querySelector("#creationPersonnageRoles");
    }

    /**
     * @override
     * @inheritdoc
     */
    ouvre(avancer){
        super.ouvre(avancer);
        this._listeRoles.innerHTML = "";
        let roles = BanqueDonnees.roles;
        for(let idRole in roles)
        {
            let role = roles[idRole];    
            let nom = Lang.get(`Role_${idRole}`);
            let description = `<em>${nom}</em> : ${Lang.get(`DescriptionRole_${idRole}`)}`;
            let selecteur = new SelecteurSimple(nom, description);

            //Sélection/Déselection du rôle
            if(this._rolesPersonnage[idRole])
                selecteur.selectionne();
            selecteur.onclick = (e) => {
                if(this._rolesPersonnage[idRole])
                {
                    delete this._rolesPersonnage[idRole];
                    selecteur.deselectionne();
                }
                else
                {
                    this._rolesPersonnage[idRole] = idRole;
                    selecteur.selectionne();
                }
            };

            this._listeRoles.appendChild(selecteur.element);
        }
    }

    detruit(){
        super.detruit();
    }
}