import { Page } from "../page";
import { Lang } from "../../lang";
import { BibliothequeDonnees } from "../../ressources/donneeSources";
import { SelecteurOpinion } from "../selecteur";

export class PageOpinions extends Page{
    /**
     * @param {Ecran} ecran L'écran auquel cette page est rattachée
     * @param {Personnage} personnage Le personnage à créer
     */
    constructor(ecran , personnage){
        super("pageCreationPersonnageOpinions", ecran);
        this._personnage = personnage;
        this._opinionsPersonnage = personnage.opinions;

        this._listeOpinions = this.element.querySelector("#creationPersonnageOpinions");
    }

    /**
     * @override
     * @inheritdoc
     */
    ouvre(animation){
        super.ouvre(animation);

        this._listeOpinions.innerHTML = "";
        for(let idOpinion in BibliothequeDonnees.opinions)
        {
            let nom = Lang.get(`Opinion_${idOpinion}`);
            let description = `<em>${nom}</em> : ${Lang.get(`DescriptionOpinion_${idOpinion}`)}`;
            let selecteur = new SelecteurOpinion(nom, description, this._opinionsPersonnage[idOpinion]);
            selecteur.onchange = (val)=>{
                this._opinionsPersonnage[idOpinion] = val;
            };
            this._listeOpinions.appendChild(selecteur.element);
        }
    }

    detruit(){
        super.detruit();
    }
}