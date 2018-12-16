import { Page } from "../page";
import { BibliothequePersonnage } from "../../ressources/bibliothequePersonnage";

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
                    ecran.ouvre("listePersonnages", false);
                });
            }
        };
    }

    /**
     * @override
     * @inheritdoc
     */
    ouvre(avancer){
        super.ouvre(avancer);
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