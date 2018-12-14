import { Page } from "../page";
import { Selecteur, SelecteurInputText, SelecteurSelect } from "./selecteur";
import { Lang } from "../../lang";
import { BanqueDonnees } from "../../donneeSources";
import { Personnage } from "../../personnages/personnage";

export class PageIdentite extends Page{
    /**
     * @param {Ecran} ecran L'écran auquel cette page est rattachée
     * @param {Personnage} personnage Le personnage à exporter
     */
    constructor(ecran , personnage, pagePrecedent, pageSuivante){
        super("pageExportationPersonnage", ecran, pagePrecedent, pageSuivante);
        this._personnage = personnage;

        
        this._boutonSauvegarder = this.element.querySelector("#exportationPersonnageSauvegarder");
        this._boutonExporter = this.element.querySelector("#exportationPersonnageExporter");
    }

    /**
     * https://stackoverflow.com/questions/34034475/edit-and-save-a-file-locally-with-js
     * 
     * @param {*} e Event provenant du onchange d'un input[type=file]
     */
    _importePersonnage(e){
        var reader = new FileReader();
        reader.onload = function(event) {
            var json = JSON.parse(event.target.result);
        }
        reader.readAsText(new Blob([e.target.files[0]], {
            "type": "application/json"
        }));
    }

    /**
     * 
     * @param {Personnage} personnage 
     */
    _exportePersonnage(personnage){
        var json = JSON.stringify(personnage);
        var blob = new Blob([json], {
            "type": "application/json"
        });
        var a = document.createElement("a");
        a.download = `${personnage.identite.pseudonyme}.json`;
        a.href = URL.createObjectURL(blob);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    /**
     * @override
     * @inheritdoc
     */
    ouvre(avancer){
        super.ouvre(avancer);

        console.log(this._personnage);
        console.log(JSON.stringify(this._personnage));

        this.initialisePseudonyme();
        this.initialiseNomAdministratif();
        this.initialiseProfession();
        this.initialiseAffiliation();
        this.initialiseGenre();
    }
    detruit(){
        super.detruit();
    }
}