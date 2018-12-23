import {Identite} from './identite';
import {Intrigue} from './intrigue';
import {Description} from './description';
import { Histoire } from './histoire';
import { Elements } from './elements';
import { BibliothequeDonnees } from '../ressources/donneeSources';

export class Personnage {
    constructor(id){
        this.id = id;
        this.roles = {};    
        this.elements = new Elements();
        this.identite = new Identite();
        this.motivation = "";
        this.intriguePersonnage = new Intrigue();
        this.opinions = {};
        for(let idOpinion in BibliothequeDonnees.opinions)
            this.opinions[idOpinion] = "?";
        this.description = new Description();  
        this.avatar = new Description();  
        this.histoire = new Histoire();
        this.pointPersonnage = 3;
        this.maxPointPersonnage = 3;
    }
}