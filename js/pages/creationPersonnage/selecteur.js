const templateSelecteurSimple = document.getElementById("creationPersonnageSelecteurSimple");
const templateSelecteurDeuxLignes = document.getElementById("creationPersonnageSelecteurDeuxLigne");
const templateSelecteurElementSpecial = document.getElementById("creationPersonnageSelecteurElementSpecial");
const templateSelecteurInput = document.getElementById("creationPersonnageSelecteurInput");
const templateSelecteurSelect = document.getElementById("creationPersonnageSelecteurSelect");

/**
 * Définis un selecteur abstrait
 */
export class Selecteur{
    /**
     * @param {HTMLTemplateElement} template Le template à utiliser pour générer le selecteur
     */
    constructor(template){
        this._onclick = ()=>{};
        this._element = template.content.cloneNode(true);
    }

    /**
     * @returns {HTMLElement} l'élément DOM de ce template
     */
    get element(){
        return this._element;
    }

    /**
     * Définis le gestionnaire d'évenement lors d'un clic sur ce selecteur
     */
    set onclick(callback){
        this._onclick = callback || (()=>{});
    }

    /**
     * Selectionne le selecteur (le met en surbrillance)
     */
    selectionne(){}

    /**
     * Deselectionne le selecteur (supprime la surbrillance)
     */
    deselectionne(){}

    /**
     * Déselectionne tous les selecteurs contenus dans un élément DOM donné
     * @param {HTMLElement} conteneur le conteneur dans lequel déselectionner tous les selecteurs
     */
    static deselectionneTous(conteneur){
        var selecteurs = conteneur.querySelectorAll(".page__selecteur__nom__possede");
        for(var selecteur of selecteurs)
            selecteur.classList.remove("page__selecteur__nom__possede");
    }
}

/**
 * Définis un selecteur simple avec une description
 */
export class SelecteurSimple extends Selecteur{
    /**
     * @param {String} texte 
     * @param {String} description
     */
    constructor(texte, description){
        super(templateSelecteurSimple);

        this._ligne1 = this._element.querySelector(".page__selecteur__nom");
        this._ligne1.innerHTML = texte;
        this._blockInfos = this._element.querySelector(".page___selecteur__infos");
        this._blockInfos.innerHTML = description;
        this._boutonInfos = this._element.querySelector(".page___selecteur__bouton_infos");
        this._boutonInfos.onclick = (e)=>{
            this._ligne1.classList.toggle("page__selecteur__nom__ouvert");
            this._boutonInfos.classList.toggle("page___selecteur__bouton_infos__ouvert");
            this._blockInfos.classList.toggle("page___selecteur__infos__ouvert");
        };
        this._ligne1.onclick = (e)=>{
            this._onclick(e);
        };
    }

    /**
     * @inheritdoc
     */
    selectionne(){
        this._ligne1.classList.add("page__selecteur__nom__possede");
    }

    /**
     * @inheritdoc
     */
    deselectionne(){
        this._ligne1.classList.remove("page__selecteur__nom__possede");
    }
    
};

/**
 * Définis un selecteur avec une description et des prérequis
 */
export class SelecteurAvecPrerequis extends Selecteur{
    /**
     * @param {String} texte 
     * @param {String} description
     */
    constructor(texte, description){
        super(templateSelecteurDeuxLignes);

        this._ligne1 = this._element.querySelector(".page__selecteur__ligne_haut");
        this._ligne1.innerHTML = texte;
        this._ligne2 = this._element.querySelector(".page__selecteur__ligne_bas");
        this._blockInfos = this._element.querySelector(".page___selecteur__infos");
        this._blockInfos.innerHTML = description;
        this._boutonInfos = this._element.querySelector(".page___selecteur__bouton_infos");
        this._boutonInfos.onclick = (e)=>{
            this._ligne2.classList.toggle("page__selecteur__nom__ouvert");
            this._boutonInfos.classList.toggle("page___selecteur__bouton_infos__ouvert");
            this._blockInfos.classList.toggle("page___selecteur__infos__ouvert");
        };
        this._ligne1.onclick = this._ligne2.onclick = (e)=>{
            this._onclick(e);
        };
    }

    /**
     * @inheritdoc
     */
    selectionne(){
        this._ligne1.classList.add("page__selecteur__nom__possede");
        if(this._ligne2)
            this._ligne2.classList.add("page__selecteur__nom__possede");
    }

    /**
     * @inheritdoc
     */
    deselectionne(){
        this._ligne1.classList.remove("page__selecteur__nom__possede");
        if(this._ligne2)
            this._ligne2.classList.remove("page__selecteur__nom__possede");
    }

    /**
     * Ajoute un prérequis
     * @param {string} nom le nom du prérequis
     * @param {boolean} possede mettre à vrai si le joueur possède le prérequis
     */
    ajoutePrerequis(nom, possede){
        if(!this._ligne2)
            return;
        let elementPrerequis = document.createElement("span");
        elementPrerequis.className = possede ? "page__selecteur__prerequis page__selecteur__prerequis__possede" : "page__selecteur__prerequis";
        elementPrerequis.innerHTML = nom;
        this._ligne2.appendChild(elementPrerequis);
    }
}

export class SelecteurElementSpecial extends Selecteur{
    /**
     * @param {String} texte
     */
    constructor(texte){
        super(templateSelecteurElementSpecial);
        this._onsupprime = (e) => {};
        this._ligne1 = this._element.querySelector(".page__selecteur__nom");
        this._ligne1.innerHTML = texte;
        this._boutonSupprimer = this._element.querySelector(".page___selecteur__bouton_supprimer");
        this._boutonSupprimer.onclick = (e)=>{
            this._onsupprime(e);
        };
        this._element = this._element.children[0];
    }

    /**
     * @inheritdoc
     */
    selectionne(){
        this._ligne1.classList.add("page__selecteur__nom__possede");
    }

    /**
     * @inheritdoc
     */
    deselectionne(){
        this._ligne1.classList.remove("page__selecteur__nom__possede");
    }

    /**
     * Définis une callback déclenchée lors d'un clique sur le bouton supprimer
     */
    set onsupprime(callback){
        this._onsupprime = callback;
    }
}

export class SelecteurInputText extends Selecteur{
    /**
     * @param {string} texte
     * @param {string} description
     */
    constructor(texte, description){
        super(templateSelecteurInput);
        this._ligne1 = this._element.querySelector(".page__selecteur__ligne_haut");
        this._ligne1.placeholder = texte;

        this._ligne2 = this._element.querySelector(".page__selecteur__ligne_bas");
        let elementPrerequis = document.createElement("span");
        elementPrerequis.className = "page__selecteur__label";
        elementPrerequis.innerHTML = texte;
        this._ligne2.appendChild(elementPrerequis);

        this._blockInfos = this._element.querySelector(".page___selecteur__infos");
        this._blockInfos.innerHTML = description;
        this._boutonInfos = this._element.querySelector(".page___selecteur__bouton_infos");
        this._boutonInfos.onclick = (e)=>{
            this._ligne2.classList.toggle("page__selecteur__nom__ouvert");
            this._boutonInfos.classList.toggle("page___selecteur__bouton_infos__ouvert");
            this._blockInfos.classList.toggle("page___selecteur__infos__ouvert");
        };
        this._onchange = (valeur)=>{};
        this._ligne1.onchange = (e)=>{
            this._onchange(this._ligne1.value);
        }
    }

    set valeur(valeur){
        this._ligne1.value = valeur;
    }

    set onchange(callback){
        this._onchange = callback;
    }
}

export class SelecteurSelect extends Selecteur{
    /**
     * @param {string} description
     */
    constructor(texte, description){
        super(templateSelecteurSelect);
        this._ligne1 = this._element.querySelector(".page__selecteur__ligne_haut");

        this._ligne2 = this._element.querySelector(".page__selecteur__ligne_bas");
        let elementPrerequis = document.createElement("span");
        elementPrerequis.className = "page__selecteur__label";
        elementPrerequis.innerHTML = texte;
        this._ligne2.appendChild(elementPrerequis);
                
        this._blockInfos = this._element.querySelector(".page___selecteur__infos");
        this._blockInfos.innerHTML = description;
        this._boutonInfos = this._element.querySelector(".page___selecteur__bouton_infos");
        this._boutonInfos.onclick = (e)=>{
            this._ligne2.classList.toggle("page__selecteur__nom__ouvert");
            this._boutonInfos.classList.toggle("page___selecteur__bouton_infos__ouvert");
            this._blockInfos.classList.toggle("page___selecteur__infos__ouvert");
        };
        this._onchange = (valeur)=>{};
        this._ligne1.onchange = (e)=>{
            this._onchange(this._ligne1.value);
        }
        this._ligne2.onclick = ()=>{
            this._ligne1.click();
        }
    }

    ajouteOption(valeur, texte, selectionnee){
        var option = document.createElement("option");
        option.value = valeur;
        option.innerHTML = texte;
        if(selectionnee)
            option.selected = true;
        this._ligne1.appendChild(option);
    }

    set onchange(callback){
        this._onchange = callback;
    }
}