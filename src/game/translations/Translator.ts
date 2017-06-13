
import {getContent} from "./FileLoader";

export class Translator {
    static translations;
    static locale:string = 'fr';

    static initialize() {
        this.translations = [];
        getContent("translations/fr.json", data => {
            this.translations['fr'] = data;
        });
        getContent("translations/en.json", data => {
            this.translations['en'] = data;
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
