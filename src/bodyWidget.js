/** Project dependencies */
import Widget from './widget';
import config from "./config";
import documentReady from "./utils/documentReady";


export default class BodyWidget extends Widget {
    constructor(component, scriptId, elementId, vueOptions) {
        super(component, scriptId, elementId, vueOptions);
    }

    getElementId() {
        return new Promise((resolve, reject) => {
            var element = document.createElement("div");
            element.id = config.keys.currentElement.elementId;

            documentReady().then(() => {
                document.body.insertBefore(element, document.body.firstChild);
                resolve("#" + config.keys.currentElement.elementId);
            });
        });

    };
}