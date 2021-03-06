import { BibliothequeTemplates } from "../ressources/templates";
import { InputDate } from "./input";

/**
 * Définit un selecteur abstrait
 */
export class Selecteur {
    /**
     * @param {string} template Le nom du template à utiliser pour générer le selecteur
     */
    constructor(template) {
        this._onclick = () => { };
        this._element = BibliothequeTemplates.getTemplate(template).content.firstElementChild.cloneNode(true);
    }

    /**
     * @returns {HTMLElement} l'élément DOM de ce template
     */
    get element() {
        return this._element;
    }

    /**
     * Définit le gestionnaire d'évenement lors d'un clic sur ce selecteur
     */
    set onclick(callback) {
        this._onclick = callback || (() => { });
    }

    /**
     * Selectionne le selecteur (le met en surbrillance)
     */
    selectionne() { }

    /**
     * Deselectionne le selecteur (supprime la surbrillance)
     */
    deselectionne() { }

    /**
     * Déselectionne tous les selecteurs contenus dans un élément DOM donné
     * @param {HTMLElement} conteneur le conteneur dans lequel déselectionner tous les selecteurs
     */
    static deselectionneTous(conteneur) {
        let selecteurs = conteneur.querySelectorAll(".page__selecteur__possede");
        for (var selecteur of selecteurs)
            selecteur.classList.remove("page__selecteur__possede");
    }
}

/**
 * Définit un selecteur simple avec une description
 */
export class SelecteurSimple extends Selecteur {
    /**
     * @param {String} texte 
     * @param {String} description
     */
    constructor(texte, description) {
        super("fragmentCreationPersonnageSelecteurSimple");

        this._ligne1 = this._element.querySelector(".page__selecteur__nom");
        this._ligne1.innerHTML = texte;
        this._blockInfos = this._element.querySelector(".page___selecteur__infos");
        this._blockInfos.innerHTML = description;
        this._boutonInfos = this._element.querySelector(".page___selecteur__bouton_infos");
        this._blockInfos.onclick = this._boutonInfos.onclick = (event) => {
            if (event)
                event.preventDefault();
            this._ligne1.classList.toggle("page__selecteur__nom__ouvert");
            this._boutonInfos.classList.toggle("page___selecteur__bouton_infos__ouvert");
            this._blockInfos.classList.toggle("page___selecteur__infos__ouvert");
        };
        this._ligne1.onclick = (event) => {
            if (event)
                event.preventDefault();
            this._onclick();
        };
    }

    /**
     * @inheritdoc
     */
    selectionne() {
        this._element.classList.add("page__selecteur__possede");
    }

    /**
     * @inheritdoc
     */
    deselectionne() {
        this._element.classList.remove("page__selecteur__possede");
    }

};


/**
 * Définit un selecteur simple sans description
 */
export class SelecteurSansDescription extends Selecteur {
    /**
     * @param {String} texte
     */
    constructor(texte, centrer) {
        super("fragmentCreationPersonnageSelecteurSansDescription");

        this._ligne1 = this._element.querySelector(".page__selecteur__nom");
        if (centrer)
            this._ligne1.style.textAlign = "center";
        this._ligne1.innerHTML = texte;
        this._ligne1.onclick = (event) => {
            if (event)
                event.preventDefault();
            this._onclick();
        };
    }

    /**
     * @inheritdoc
     */
    selectionne() {
        this._element.classList.add("page__selecteur__possede");
    }

    /**
     * @inheritdoc
     */
    deselectionne() {
        this._element.classList.remove("page__selecteur__possede");
    }

};

/**
 * Définit un selecteur avec une description et des prérequis
 */
export class SelecteurAvecPrerequis extends Selecteur {
    /**
     * @param {String} texte 
     * @param {String} description
     */
    constructor(texte, description) {
        super("fragmentCreationPersonnageSelecteurDeuxLignes");

        this._ligne1 = this._element.querySelector(".page__selecteur__ligne_haut");
        this._ligne1.innerHTML = texte;
        this._ligne2 = this._element.querySelector(".page__selecteur__ligne_bas");
        this._blockInfos = this._element.querySelector(".page___selecteur__infos");
        this._blockInfos.innerHTML = description;
        this._boutonInfos = this._element.querySelector(".page___selecteur__bouton_infos");
        this._blockInfos.onclick = this._boutonInfos.onclick = (event) => {
            if (event)
                event.preventDefault();
            this._ligne2.classList.toggle("page__selecteur__nom__ouvert");
            this._boutonInfos.classList.toggle("page___selecteur__bouton_infos__ouvert");
            this._blockInfos.classList.toggle("page___selecteur__infos__ouvert");
        };
        this._ligne1.onclick = this._ligne2.onclick = (event) => {
            if (event)
                event.preventDefault();
            this._onclick(event);
        };
    }

    /**
     * @inheritdoc
     */
    selectionne() {
        this._element.classList.add("page__selecteur__possede");
    }

    /**
     * @inheritdoc
     */
    deselectionne() {
        this._element.classList.remove("page__selecteur__possede");
    }

    /**
     * Ajoute un prérequis
     * @param {string} nom le nom du prérequis
     * @param {boolean} possede mettre à vrai si le joueur possède le prérequis
     */
    ajoutePrerequis(nom, possede) {
        if (!this._ligne2)
            return;
        let elementPrerequis = document.createElement("span");
        elementPrerequis.className = possede ? "page__selecteur__prerequis page__selecteur__prerequis__possede" : "page__selecteur__prerequis";
        elementPrerequis.innerHTML = nom;
        this._ligne2.appendChild(elementPrerequis);
    }
}

export class SelecteurElementSpecial extends Selecteur {
    /**
     * @param {String} texte
     */
    constructor(texte) {
        super("fragmentCreationPersonnageSelecteurElementSpecial");
        this._onsupprime = (e) => { };
        this._ligne1 = this._element.querySelector(".page__selecteur__nom");
        this._ligne1.innerHTML = texte;
        this._boutonSupprimer = this._element.querySelector(".page___selecteur__bouton_supprimer");
        this._boutonSupprimer.onclick = (event) => {
            if (event)
                event.preventDefault();
            this._onsupprime(event);
        };
    }

    /**
     * @inheritdoc
     */
    selectionne() {
        this._element.classList.add("page__selecteur__possede");
    }

    /**
     * @inheritdoc
     */
    deselectionne() {
        this._element.classList.remove("page__selecteur__possede");
    }

    /**
     * Définit une callback déclenchée lors d'un clique sur le bouton supprimer
     */
    set onsupprime(callback) {
        this._onsupprime = callback;
    }
}

export class SelecteurAjoutElement extends Selecteur {
    /**
     * @param {string} texte
     */
    constructor(texte) {
        super("fragmentCreationPersonnageSelecteurAjoutElement");
        this._ligne1 = this._element.querySelector(".page__selecteur__nom");
        this._ligne1.placeholder = texte;
        this._ligne1.onfocus = () => {
            this._ligne1.scrollIntoView(true);
        };

        this._onadd = (valeur) => { };
        this._boutonAjouter = this._element.querySelector(".page___selecteur__bouton_ajouter");
        this._boutonAjouter.onclick = (event) => {
            if (event)
                event.preventDefault();
            let nom = this._ligne1.value;
            if (nom && nom.trim() != "") {
                this._onadd(nom);
                this._ligne1.blur();
            }
            else if (document.activeElement != this._ligne1)
                this._ligne1.focus();
            else
                this._ligne1.blur();
            this._ligne1.value = "";
        }
    }

    set onadd(callback) {
        this._onadd = callback;
    }
}

export class SelecteurInputText extends Selecteur {
    /**
     * @param {string} texte
     * @param {string} description
     */
    constructor(texte, description) {
        super("fragmentCreationPersonnageSelecteurInput");
        this._ligne1 = this._element.querySelector(".page__selecteur__nom");
        this._ligne1.placeholder = texte;
        this._ligne1.onfocus = () => {
            this._ligne1.scrollIntoView(true);
        };

        this._blockInfos = this._element.querySelector(".page___selecteur__infos");
        this._blockInfos.innerHTML = description;
        this._boutonInfos = this._element.querySelector(".page___selecteur__bouton_infos");
        this._blockInfos.onclick = this._boutonInfos.onclick = (event) => {
            if (event)
                event.preventDefault();
            this._ligne1.classList.toggle("page__selecteur__nom__ouvert");
            this._boutonInfos.classList.toggle("page___selecteur__bouton_infos__ouvert");
            this._blockInfos.classList.toggle("page___selecteur__infos__ouvert");
        };
        this._onchange = (valeur) => { };
        this._ligne1.onchange = (e) => {
            this._onchange(this._ligne1.value);
        };
    }

    set valeur(valeur) {
        this._ligne1.value = valeur;
    }

    set onchange(callback) {
        this._onchange = callback;
    }
}

export class SelecteurInputDate extends Selecteur {
    /**
     * @param {string} description
     * @param {boolean} mois Gérer le mois
     * @param {boolean} jour Gérer le jour du moi
     */
    constructor(description, mois, jour) {
        super("fragmentCreationPersonnageSelecteurDate");
        this._ligne1 = this._element.querySelector(".page__selecteur__nom");
        this._ligne1.onfocus = () => {
            this._ligne1.scrollIntoView(true);
        };
        this._inputDate = new InputDate(this._ligne1, mois, jour);

        this._blockInfos = this._element.querySelector(".page___selecteur__infos");
        this._blockInfos.innerHTML = description;
        this._boutonInfos = this._element.querySelector(".page___selecteur__bouton_infos");
        this._blockInfos.onclick = this._boutonInfos.onclick = (event) => {
            if (event)
                event.preventDefault();
            this._ligne1.classList.toggle("page__selecteur__nom__ouvert");
            this._boutonInfos.classList.toggle("page___selecteur__bouton_infos__ouvert");
            this._blockInfos.classList.toggle("page___selecteur__infos__ouvert");
        };
        this._onchange = (valeur) => { };
        this._ligne1.onchange = (e) => {
            this._onchange(this._ligne1.value);
        };
    }

    set valeur(valeur) {
        this._inputDate.date = valeur;
    }

    set onchange(callback) {
        this._inputDate.onchange = callback;
    }

    set anneeMin(valeur) {
        this._inputDate.anneeMin = valeur;
    }

    set max(valeur) {
        this._inputDate.anneeMin = valeur;
    }
}

export class SelecteurSelect extends Selecteur {
    /**
     * @param {string} description
     */
    constructor(texte, description) {
        super("fragmentCreationPersonnageSelecteurSelect");
        this._ligne1 = this._element.querySelector(".page__selecteur__nom");
        this._ligne1.placeholder = texte;

        this._blockInfos = this._element.querySelector(".page___selecteur__infos");
        this._blockInfos.innerHTML = description;
        this._boutonInfos = this._element.querySelector(".page___selecteur__bouton_infos");
        this._blockInfos.onclick = this._boutonInfos.onclick = (event) => {
            if (event)
                event.preventDefault();
            this._ligne1.classList.toggle("page__selecteur__nom__ouvert");
            this._boutonInfos.classList.toggle("page___selecteur__bouton_infos__ouvert");
            this._blockInfos.classList.toggle("page___selecteur__infos__ouvert");
        };
        this._onchange = (valeur) => { };
        this._ligne1.onchange = (e) => {
            this._onchange(this._ligne1.value);
        }
    }

    ajouteOption(valeur, texte, selectionnee) {
        let option = document.createElement("option");
        option.value = valeur;
        option.innerHTML = texte;
        if (selectionnee)
            option.selected = true;
        this._ligne1.appendChild(option);
    }

    set onchange(callback) {
        this._onchange = callback;
    }
}

export class SelecteurOpinion extends Selecteur {
    /**
     * @param {string} description
     */
    constructor(texte, description, valeurInitiale) {
        super("fragmentCreationPersonnageSelecteurOpinion");
        this._label = this._element.querySelector(".page__selecteur__premier_nom");
        this._label.innerHTML = texte;

        this._ligne1 = this._element.querySelector(".page__selecteur__second_nom");
        this._ligne1.placeholder = texte;
        this._ligne1.value = valeurInitiale;

        this._blockInfos = this._element.querySelector(".page___selecteur__infos");
        this._blockInfos.innerHTML = description;
        this._boutonInfos = this._element.querySelector(".page___selecteur__bouton_infos");
        this._blockInfos.onclick = this._boutonInfos.onclick = (event) => {
            if (event)
                event.preventDefault();
            this._label.classList.toggle("page__selecteur__nom__ouvert");
            this._boutonInfos.classList.toggle("page___selecteur__bouton_infos__ouvert");
            this._blockInfos.classList.toggle("page___selecteur__infos__ouvert");
        };
        this._onchange = (valeur) => { };
        this._ligne1.onchange = (e) => {
            this._onchange(this._ligne1.value);
        }
    }

    set onchange(callback) {
        this._onchange = callback;
    }
}

export class SelecteurTextArea extends Selecteur {
    /**
     * @param {string} texte
     * @param {number} lignes
     */
    constructor(texte, lignes) {
        super("fragmentCreationPersonnageSelecteurTextArea");
        this._ligne1 = this._element.querySelector(".page__selecteur__textarea");
        this._ligne1.placeholder = texte;
        this._ligne1.rows = lignes || 5;
        this._ligne1.onfocus = () => {
            this._ligne1.scrollIntoView(true);
        };

        this._onchange = (valeur) => { };
        this._ligne1.onchange = (e) => {
            this._onchange(this._ligne1.value);
        };
    }

    set valeur(valeur) {
        this._ligne1.value = valeur;
    }

    set onchange(callback) {
        this._onchange = callback;
    }
}

/**
 * Définit un selecteur permettant d'affecter une valeur à un élément
 */
export class SelecteurValeurElement extends Selecteur {
    /**
     * @param {String} texte 
     * @param {String[]} descriptions le texte de chaque valeurs rangées dans un tableau
     */
    constructor(texte, descriptions, valeurInitiale) {
        super("fragmentCreationPersonnageSelecteurEvaluation");
        this._valeur = -1;
        this._textes = descriptions;

        this._ligne1 = this._element.querySelector(".page__selecteur__ligne_haut");
        this._ligne1.innerHTML = texte;
        this._ligne2 = this._element.querySelector(".page__selecteur__ligne_bas");
        this._ligneValeur = this._element.querySelector(".page___selecteur__valeur_element");

        this._onchange = (valeur) => { };
        this._setValeur(valeurInitiale);

        this._boutonMoins = this._element.querySelector(".page___selecteur__bouton_moins");
        this._boutonMoins.onclick = (event) => {
            if (event)
                event.preventDefault();
            this._setValeur(this._valeur - 1);
        };

        this._boutonPlus = this._element.querySelector(".page___selecteur__bouton_plus");
        this._boutonPlus.onclick = (event) => {
            if (event)
                event.preventDefault();
            this._setValeur(this._valeur + 1);
        };
    }

    _setValeur(valeur) {
        valeur = Math.round(valeur);
        if (valeur < 0)
            valeur = 0;
        if (valeur > 3)
            valeur = 3;
        if (valeur == this._valeur)
            return;
        this._valeur = valeur;
        this._ligne2.innerHTML = `<span class="page__selecteur__label page__selecteur__label__focus">${this._textes[valeur]}</span>`;
        this._ligneValeur.innerHTML = `${valeur}`;
        this._onchange(valeur);
    }

    set onchange(callback) {
        this._onchange = callback;
    }
}

export class SelecteurPeriodeCarriere extends Selecteur {
    /**
     */
    constructor(texteDate, texteCarriere, texteAffiliation, texteEvenements) {
        super("fragmentCreationPersonnageSelecteurPeriodeHistorique");

        this._onchangedate = (valeur) => { };
        this._date = this._element.querySelector(".page__selecteur_historique__date");
        this._inputDate = new InputDate(this._date, true, true);
        this._inputDate.onchange = (valeur) => {
            this._onchangedate(valeur);
        }

        this._onclickcarriere = () => { };
        this._carrieres = this._element.querySelector(".page__selecteur_historique__carriere");
        this._carrieres.onclick = (e) => {
            this._onclickcarriere();
        }

        this._onclickaffiliation = (valeur) => { };
        this._affiliation = this._element.querySelector(".page__selecteur_historique__affiliation");
        this._affiliation.onclick = (e) => {
            this._onclickaffiliation();
        }

        this._onchangeevenement = (valeur) => { };
        this._evenements = this._element.querySelector(".page__selecteur_historique__evenement");
        this._evenements.placeholder = texteEvenements;
        this._evenements.onchange = (e) => {
            this._onchangeevenement(this._evenements.value);
        }

        this._onsupprime = () => { };
        this._boutonSupprimer = this._element.querySelector(".page__selecteur_historique__supprimer");
        this._boutonSupprimer.onclick = (event) => {
            if (event)
                event.preventDefault();
            this._onsupprime();
        };

    }

    /**
     * Définit une callback déclenchée lors d'un clique sur le bouton supprimer
     * @param {function(strivoidng)=>void} callback
     */
    set onsupprime(callback) {
        this._onsupprime = callback;
    }

    /**
     * Définit une callback déclenchée lors d'une modification de la date
     * @param {function(string)=>void} callback
     */
    set onchangedate(callback) {
        this._onchangedate = callback;
    }

    /**
     * Définit une callback déclenchée lors d'une modification des carrieres
     * @param {function(void)=>void} callback
     */
    set onclickcarriere(callback) {
        this._onclickcarriere = callback;
    }

    /**
     * Définit une callback déclenchée lors d'une modification de l'affiliation
     * @param {function(void)=>void} callback
     */
    set onclickaffiliation(callback) {
        this._onclickaffiliation = callback;
    }

    /**
     * Définit une callback déclenchée lors d'une modification des événements
     * @param {function(string)=>void} callback
     */
    set onchangeevenement(callback) {
        this._onchangeevenement = callback;
    }

    set date(valeur) {
        this._inputDate.date = valeur;
    }

    set carrieres(valeur) {
        let html = "";
        for (let carriere of valeur)
            if (html == "")
                html = carriere;
            else
                html += `, ${carriere}`;
        this._carrieres.innerHTML = html;
    }

    set affiliation(valeur) {
        let html = "";
        for (let affiliation of valeur)
            if (html == "")
                html = affiliation;
            else
                html += `, ${affiliation}`;
        this._affiliation.innerHTML = html;
    }

    set evenements(valeur) {
        this._evenements.value = valeur;
    }
}

export class SelecteurPersonnage extends Selecteur {
    /**
     * @param {String} texte
     */
    constructor(texte) {
        super("fragmentListePersonnageSelecteurPersonnage");
        this._onsupprime = (e) => { };
        this._onsauvegarde = (e) => { };
        this._onedite = (e) => { };
        this._ligne1 = this._element.querySelector(".page__selecteur__nom");
        this._ligne1.innerHTML = texte;
        this._ligne1.onclick = (event) => {
            if (event)
                event.preventDefault();
            this._onclick();
        };

        this._boutonEditer = this._element.querySelector(".page___selecteur__bouton_editer");
        this._boutonEditer.onclick = (event) => {
            if (event)
                event.preventDefault();
            this._onedite(event);
        };

        this._boutonSauvegarder = this._element.querySelector(".page___selecteur__bouton_sauvegarder");
        this._boutonSauvegarder.onclick = (event) => {
            if (event)
                event.preventDefault();
            this._onsauvegarde(event);
        };

        this._boutonSupprimer = this._element.querySelector(".page___selecteur__bouton_supprimer");
        this._boutonSupprimer.onclick = (event) => {
            if (event)
                event.preventDefault();
            this._onsupprime(event);
        };

    }

    /**
     * @inheritdoc
     */
    selectionne() {
        this._element.classList.add("page__selecteur__possede");
    }

    /**
     * @inheritdoc
     */
    deselectionne() {
        this._element.classList.remove("page__selecteur__possede");
    }

    /**
     * Définit une callback déclenchée lors d'un clique sur le bouton éditer
     */
    set onedite(callback) {
        this._onedite = callback;
    }

    /**
     * Définit une callback déclenchée lors d'un clique sur le bouton supprimer
     */
    set onsupprime(callback) {
        this._onsupprime = callback;
    }

    /**
     * Définit la callback déclenchée lors d'un clique sur le bouton sauvegarde
     */
    set onsauvegarde(callback) {
        this._onsauvegarde = callback;
    }
}
