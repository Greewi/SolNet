import { Ajax } from "../ajax";
import { Loader } from "../loader";

export class BibliothequeThemes{
    /**
     * Initialise la banque de themes
     * @returns {Promise}
     */
    static initialise(){
        this._themes = {};
        return Ajax.get("./res/themes.json")
        .then((json)=>{
            this._themes = JSON.parse(json);
            console.log("Themes chargés");
            let promises = [];
            for(let idTheme in this._themes)
            {
                let theme = this._themes[idTheme];
                for(let imageSrc of theme.images)
                {
                    promises.push(new Promise((accept, reject)=>{
                        let image = new Image();
                        image.onload = accept;
                        image.onerror = reject;
                        image.src = `./images/${imageSrc}`;
                        Loader.termineSousEtape();
                    }));
                }
            }
            Loader.setNombreSousEtape(promises.length);
            return Promise.all(promises);
        });
    };

    /**
     * Définis le theme de l'application
     * @param {string} nomTheme Le nom du thème
     */
    static setTheme(nomTheme){
        let root = document.documentElement;
        let theme = this._themes[nomTheme]
        if(theme){
            let variables = theme.variables;
            for(let variable in variables)
                root.style.setProperty(`--${variable}`, variables[variable]);
        }
    }
}