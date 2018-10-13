const templateSelecteurSimple = document.getElementById("creationPersonnageSelecteurSimple");
const templateSelecteurDeuxLignes = document.getElementById("creationPersonnageSelecteurDeuxLigne");

export class Selecteur{
    /**
     * 
     * @param {String} texte 
     * @param {String} description 
     * @param {boolean} possedePrerequis 
     */
    constructor(texte, description, possedePrerequis){
        this._onclick = ()=>{};
        if(possedePrerequis){
            this._element = templateSelecteurDeuxLignes.content.cloneNode(true);
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
        else {
            this._element = templateSelecteurSimple.content.cloneNode(true);
            this._ligne1 = this._element.querySelector(".page__selecteur__nom");
            this._ligne1.innerHTML = texte;
            this._ligne2 = null;
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
    }

    selectionne(){
        this._ligne1.classList.add("page__selecteur__nom__possede");
        if(this._ligne2)
            this._ligne2.classList.add("page__selecteur__nom__possede");
    }

    deselectionne(){
        this._ligne1.classList.remove("page__selecteur__nom__possede");
        if(this._ligne2)
            this._ligne2.classList.remove("page__selecteur__nom__possede");
    }

    static deselectionneTous(conteneur){
        var selecteurs = conteneur.querySelectorAll(".page__selecteur__nom__possede");
        for(var selecteur of selecteurs)
            selecteur.classList.remove("page__selecteur__nom__possede");
    }

    ajoutePrerequis(nom, possede){
        if(!this._ligne2)
            return;
        let elementPrerequis = document.createElement("span");
        elementPrerequis.className = possede ? "page__selecteur__prerequis page__selecteur__prerequis__possede" : "page__selecteur__prerequis";
        elementPrerequis.innerHTML = nom;
        this._ligne2.appendChild(elementPrerequis);
    }

    get element(){
        return this._element;
    }

    set onclick(callback){
        this._onclick = callback || (()=>{});
    }
}