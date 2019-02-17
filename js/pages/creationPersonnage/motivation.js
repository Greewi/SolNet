import { Page } from "../page";
import { SelecteurTextArea } from "../../ui/selecteur";
import { Lang } from "../../lang";
import { Personnage } from "../../personnages/personnage";

export class PageMotivation extends Page{
    /**
     * @param {Ecran} ecran L'écran auquel cette page est rattachée
     * @param {Personnage} personnage Le personnage à créer
     */
    constructor(ecran, personnage){
        super("pageCreationPersonnageMotivation", ecran);
        this._personnage = personnage;
        this._elementMotivation = this.element.querySelector("#creationPersonnageMotivation");
    }

    /**
     * @override
     * @inheritdoc
     */
    ouvre(animation){
        super.ouvre(animation);
        this._elementMotivation.innerHTML = "";
        this._selecteurMotivation = new SelecteurTextArea(Lang.get("InputMotivation"), 4);
        this._selecteurMotivation.valeur = this._personnage.motivation;
        this._selecteurMotivation.onchange = (valeur)=>{
            this._personnage.motivation = valeur;
        };
        this._elementMotivation.appendChild(this._selecteurMotivation.element);
    }

    detruit(){
        super.detruit();
    }
}
