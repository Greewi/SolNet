export class Utils{
    /**
     * Parse une chaine JSON et renvoie un object javascript.
     * @param {string} chaineJSON 
     */
    static parseJSON(chaineJSON){
        try
        {
            return JSON.parse(chaineJSON);
        }
        catch(e)
        {
            console.error(e);
            return null;
        }
    }
}