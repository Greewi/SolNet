import { Page } from "../page";
import { Personnage } from "../../personnages/personnage";
import { BibliothequeDonnees } from "../../ressources/donneeSources";
import { Lang } from "../../lang";

export class PageAfficherPersonnage extends Page{
    /**
     * @param {Ecran} ecran L'écran auquel cette page est rattachée
     * @param {Personnage} personnage Le personnage à  visualiser
     * @param {string} [templatePage] Le template de la page à utiliser
     */
    constructor(ecran, personnage, templatePage){
        super(templatePage || "pagePersonnageAfficher", ecran);

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

        let listeOpinions = this.element.querySelector("#affichagePersonnageOpinions");
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

        let listeTraits = this.element.querySelector("#affichagePersonnageTraits");
        this.genereListe(listeTraits, personnage.elements.traits, "NiveauTrait");

        let listeCarrieres = this.element.querySelector("#affichagePersonnageCarrieres");
        this.genereListe(listeCarrieres, personnage.elements.carrieres, "NiveauCarriere");

        let listeRelations = this.element.querySelector("#affichagePersonnageRelations");
        this.genereListe(listeRelations, personnage.elements.relations, "NiveauRelation");

        let listeModifications = this.element.querySelector("#affichagePersonnageModifications");
        this.genereListe(listeModifications, personnage.elements.modifications, "NiveauMateriel");

        let listeEquipement = this.element.querySelector("#affichagePersonnageEquipement");
        this.genereListe(listeEquipement, personnage.elements.equipements, "NiveauMateriel");

        let listeLogiciels = this.element.querySelector("#affichagePersonnageLogiciels");
        this.genereListe(listeLogiciels, personnage.elements.logiciels, "NiveauMateriel");

        this.element.querySelector("#affichagePersonnageDateNaissance").innerHTML = personnage.histoire.dateNaissance;
        this.element.querySelector("#affichagePersonnageLieuNaissance").innerHTML = personnage.histoire.lieuNaissance;
        this.element.querySelector("#affichagePersonnageDetailsNaissance").innerHTML = personnage.histoire.detailNaissance;

        let listeHistorique = this.element.querySelector("#affichagePersonnageHistorique");
        for(let periode of personnage.histoire.historique)
        {
            let carrieres = "";
            for(let carriere of periode.carrieres)
            if(carrieres=="")
                carrieres=carriere;
            else
                carrieres += `, ${carriere}`;

            let affiliations = "";
            for(let affiliation of periode.affiliation)
            if(affiliations=="")
                affiliations=affiliation;
            else
                affiliations += `, ${affiliation}`;

            let html = `<em>${periode.date}</em> : <br/>`;
            html += `${Lang.get("InputCarrieres")} : ${carrieres} <br/>`
            html += `${Lang.get("InputAffiliation")} : ${affiliations} <br/>`
            html += `${Lang.get("InputEvenements")} : ${periode.evenements}`;

            let li = document.createElement("li");
            li.innerHTML = html;
            listeHistorique.appendChild(li);
        }

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