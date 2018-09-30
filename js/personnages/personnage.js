import {Identite} from './identite';
import {Intrigue} from './intrigue';
import {Opinion} from './opinion';
import {Description} from './description';
import {Element} from './element';
import { Histoire } from './histoire';

export class Personnage {
    constructor(){
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

        /**
         * @type {Element[]}
         */
        this.traits = [];
        /**
         * @type {Element[]}
         */
        this.carrieres = [];
        /**
         * @type {Element[]}
         */
        this.relations = [];
        /**
         * @type {Element[]}
         */
        this.modifications = [];
        /**
         * @type {Element[]}
         */
        this.equipement = [];
        /**
         * @type {Element[]}
         */
        this.logiciels = [];

        this.pointPersonnage = 3;
        this.maxPointPersonnage = 3;

        this.histoire = new Histoire();
    }
}