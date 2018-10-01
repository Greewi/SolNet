import {Identite} from './identite';
import {Intrigue} from './intrigue';
import {Opinion} from './opinion';
import {Description} from './description';
import {Element} from './element';
import { Histoire } from './histoire';
import { Elements } from './elements';

export class Personnage {
    constructor(){
        /**
         * @type {Object<string, string>}
         */
        this.roles = {};    
        this.elements = new Elements();
        this.identite = new Identite();
        this.motivation = "";
        this.intriguePersonnage = new Intrigue();
        this.opinions = [
            new Opinion("TECHNOLOGIE", "Technologie"),
            new Opinion("BIOLOGIQUES", "Biologiques"),
            new Opinion("MODIFIES", "Modifiés"),
            new Opinion("ARTIFICIELS", "Artificiels"),
            new Opinion("PSIONS", "Psions"),
            new Opinion("RELIGIONS", "Religions"),
            new Opinion("TERRE", "Terre"),
            new Opinion("COLONIES", "Colonies"),
        ];
        this.description = new Description();  
        this.avatar = new Description();  
        this.histoire = new Histoire();
        this.pointPersonnage = 3;
        this.maxPointPersonnage = 3;
    }
}