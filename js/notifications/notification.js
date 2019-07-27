import { InterfaceGenerale } from "../ui/interfaceGenerale";
import { BibliothequeTemplates } from "../ressources/templates";

/**
 * Représente une notification
 * Les notifications se déclenchent lorsqu'un événement se produit et s'affichent dans
 * le paneau latéral. Une puce peut aussi apparaître sur le bouton du menu.
 */
export class Notification {
    /**
     * @param {string} template le nom du template de la notification
     */
    constructor(template) {
        this._element = BibliothequeTemplates.getTemplate(template).content.cloneNode(true).firstChild;
        this._boutonAction = this._element.querySelector(".notification_boutonAction");
        if (this._boutonAction)
            this._boutonAction.addEventListener("click", () => this.onAction());
    }

    /**
     * Ajoute la notification à l'interface
     */
    ajouteDansInterface() {
        InterfaceGenerale.ajouteNotification(this._element);
    }

    /**
     * Méthode déclenchée lors du click sur le bouton d'action
     */
    onAction() {
        InterfaceGenerale.supprimeNotification(this._element);
    }
}