
import {getContenuUtile} from "./fichier";

export class Translator {
    static translations;
    static locale:string = 'fr';

    static initialize() {
        this.translations = [];
        getContenuUtile("translations/fr.json", data => {
            this.translations['fr'] = data;
        });
        getContenuUtile("translations/en.json", data => {
            this.translations['en'] = data;
        });
    }

    static t(key: string) {
        key = this.locale + '.' + key;
        let result = 'missing translation: ' + key;
        try {
            result = key.split('.').reduce(function (tree, key) {
                return tree[key];
            }, this.translations);
        } catch (e) {
            console.log(result);
        }

        return result;
    }
}
