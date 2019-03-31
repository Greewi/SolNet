export class Utils {
    /**
     * Parse une chaine JSON et renvoie un object javascript.
     * @param {string} chaineJSON 
     */
    static parseJSON(chaineJSON) {
        try {
            return JSON.parse(chaineJSON);
        }
        catch (e) {
            console.error(e);
            return null;
        }
    }

    static comparaisonDate(date1, date2) {
        date1 = date1.split("-");
        date2 = date2.split("-");
        if (parseInt(date1[0]) < parseInt(date2[0]))
            return 1;
        if (parseInt(date1[0]) > parseInt(date2[0]))
            return -1;
        if (parseInt(date1[1]) < parseInt(date2[1]))
            return 1;
        if (parseInt(date1[1]) > parseInt(date2[1]))
            return -1;
        if (parseInt(date1[2]) < parseInt(date2[2]))
            return 1
        if (parseInt(date1[2]) > parseInt(date2[2]))
            return -1;
        return 0;
    }

    static mergeSort(tableau, comparaison) {
        comparaison = comparaison || ((a, b) => { return b - a });

        const fusion = (gauche, droite) => {
            const resultat = [];
            while (gauche.length > 0 && droite.length > 0) {
                if (comparaison(gauche[0], droite[0]) >= 0)
                    resultat.push(gauche.shift());
                else
                    resultat.push(droite.shift());
            }
            while(gauche.length > 0)
                resultat.push(gauche.shift());
            while(droite.length > 0)
                resultat.push(droite.shift());
            return resultat;
        }

        const tri = (tableau) => {
            if (tableau.length < 2)
                return tableau;
            let moitie = Math.floor(tableau.length / 2);
            let gauche = tableau.slice(0, moitie);
            let droite = tableau.slice(moitie, tableau.length);
            return fusion(tri(gauche), tri(droite));
        }

        return tri(tableau);
    }
}