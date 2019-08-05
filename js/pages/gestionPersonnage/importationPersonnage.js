import { Page } from "../page";
import { BibliothequePersonnage } from "../../ressources/bibliothequePersonnage";
import { Sommaire } from "../../ui/sommaire";

export class PageImporterPersonnage extends Page{
    /**
     * @param {Ecran} ecran L'écran auquel cette page est rattachée
     */
    constructor(ecran){
        super("pagePersonnageImporter", ecran);

        this._inputFile = this.element.querySelector("#importationPersonnageSelecteurFichier");
        this._inputFile.onchange = (event) => {
            if(this._inputFile.files && this._inputFile.files.length > 0)
            {
                BibliothequePersonnage.importePersonnage(this._inputFile.files[0], ()=>{
                    ecran.ouvre("listePersonnages", Page.RECULER);
                });
            }
        };

        this._sommaire = new Sommaire();
    }

    /**
     * @override
     * @inheritdoc
     */
    ouvre(animation){
        super.ouvre(animation);
        this._inputFile.value = "";
    }

    /**
     * @override
     * @inheritdoc
     */
    detruit(){
        super.detruit();
    }
}