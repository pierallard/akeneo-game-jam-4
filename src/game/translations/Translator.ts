
import {getContent} from "./FileLoader";

export class Translator {
    static translations;
    static locale:string = 'fr';

    static setLocale(locale: string) {
        this.locale = locale;
    }

    static initialize() {
        this.translations = [];
        getContent("translations/fr.json", data => {
            this.translations['fr'] = data;
        });
        getContent("translations/en.json", data => {
            this.translations['en'] = data;
        });
        getContent("translations/es.json", data => {
            this.translations['es'] = data;
        });
    }

    static t(key: string) {
        key = this.locale + '.' + key;
        let result = key;
        try {
            result = key.split('.').reduce((tree, key) => tree[key], this.translations);
        } catch (e) {
            console.log('Missing translation: "' + result + '"');
        }
        if (undefined === result) {
            return key;
        }

        return result;
    }
}
