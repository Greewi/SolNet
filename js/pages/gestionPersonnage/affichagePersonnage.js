import { Page } from "../page";
import { Personnage } from "../../personnages/personnage";
import { BibliothequeDonnees } from "../../ressources/donneeSources";
import { Lang } from "../../lang";

export class PageAfficherPersonnage extends Page{
    /**
     * @param {Ecran} ecran L'écran auquel cette page est rattachée
     * @param {Personnage} personnage Le personnage à  visualiser
     */
    constructor(ecran, personnage){
        super("pagePersonnageAfficher", ecran);

        console.log(personnage);

        this.element.querySelector("#affichagePersonnagePseudonyme").innerHTML = personnage.identite.pseudonyme;
        this.element.querySelector("#affichagePersonnageNomAdministratif").innerHTML = personnage.identite.nomAdministratif;
        let roles = "";
        for(let idRole in personnage.roles)
        {
            let nomRole = Lang.get("Role_"+idRole);
            roles += roles==""? nomRole : ", "+nomRole;
        }
        this.element.querySelector("#affichagePersonnageRoles").innerHTML = roles;
        this.element.querySelector("#affichagePersonnageProfession").innerHTML = personnage.identite.profession;
        if(personnage.identite.natureEsprit)
            this.element.querySelector("#affichagePersonnageNatureEsprit").innerHTML = Lang.get("Intelligence_"+personnage.identite.natureEsprit.id);
        if(personnage.identite.enveloppeUsuelle)
            this.element.querySelector("#affichagePersonnageEnveloppeUsuelle").innerHTML = Lang.get("Enveloppe_"+personnage.identite.enveloppeUsuelle.id);
        this.element.querySelector("#affichagePersonnageAffiliation").innerHTML = personnage.identite.affiliation;
        this.element.querySelector("#affichagePersonnageGenre").innerHTML = Lang.get("Genre_"+personnage.identite.genre);

        this.element.querySelector("#affichagePersonnageMotivation").innerHTML = personnage.motivation;

        var listeOpinions = this.element.querySelector("#affichagePersonnageOpinions");
        for(let idOpinion in personnage.opinions)
        {
            let nomOpinion = Lang.get(`Opinion_${idOpinion}`);
            let niveau = Lang.get(`NiveauOpinion_${personnage.opinions[idOpinion]}`);
            let li = document.createElement("li");
            li.innerHTML = `<em>${nomOpinion}</em> : ${niveau}`;
            listeOpinions.appendChild(li);
        }

        this.element.querySelector("#affichagePersonnageDescriptionImpression").innerHTML = personnage.description.premiereImpression;
        this.element.querySelector("#affichagePersonnageDescriptionCorps").innerHTML = personnage.description.corps;
        this.element.querySelector("#affichagePersonnageDescriptionVisage").innerHTML = personnage.description.visage;

        this.element.querySelector("#affichagePersonnageAvatarImpression").innerHTML = personnage.avatar.premiereImpression;
        this.element.querySelector("#affichagePersonnageAvatarCorps").innerHTML = personnage.avatar.corps;
        this.element.querySelector("#affichagePersonnageAvatarVisage").innerHTML = personnage.avatar.visage;

        var listeTraits = this.element.querySelector("#affichagePersonnageTraits");
        this.genereListe(listeTraits, personnage.elements.traits, "NiveauTrait");

        var listeCarrieres = this.element.querySelector("#affichagePersonnageCarrieres");
        this.genereListe(listeCarrieres, personnage.elements.carrieres, "NiveauCarriere");

        var listeRelations = this.element.querySelector("#affichagePersonnageRelations");
        this.genereListe(listeRelations, personnage.elements.relations, "NiveauRelation");

        var listeModifications = this.element.querySelector("#affichagePersonnageModifications");
        this.genereListe(listeModifications, personnage.elements.modifications, "NiveauMateriel");

        var listeEquipement = this.element.querySelector("#affichagePersonnageEquipement");
        this.genereListe(listeEquipement, personnage.elements.equipements, "NiveauMateriel");

        var listeLogiciels = this.element.querySelector("#affichagePersonnageLogiciels");
        this.genereListe(listeLogiciels, personnage.elements.logiciels, "NiveauMateriel");

        this.element.querySelector("#affichagePersonnagePP").innerHTML = personnage.pointPersonnage;
        this.element.querySelector("#affichagePersonnageMaxPP").innerHTML = personnage.maxPointPersonnage;
    }

    genereListe(liste, elements, prefixNiveau){
        for(let element of elements)
        {
            let nom = element.nom;
            let niveau = `${Lang.get(`${prefixNiveau}_${element.score}`)} (${element.score})`;
            let li = document.createElement("li");
            li.innerHTML = `<em>${nom}</em> : ${niveau}`;
            liste.appendChild(li);
        }
    }

    /**
     * @override
     * @inheritdoc
     */
    ouvre(animation){
        super.ouvre(animation);
    }

    /**
     * @override
     * @inheritdoc
     */
    detruit(){
        super.detruit();
    }
}