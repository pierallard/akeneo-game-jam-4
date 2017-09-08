
import Play from "./state/Play";
import {Translator} from "./translations/Translator";
import {SimpleGame} from "../app";

export class LocaleSwitcher {
    private play: Play;
    private flags: Array<Phaser.Sprite>;

    constructor(play: Play) {
        this.play = play;
        this.flags = [];
    }

    create() {
        this.createFlag('en', 760, 12);
        this.createFlag('es', 710, 12);
        this.createFlag('fr', 660, 12);
    }

    private createFlag(locale: string, x: number, y: number) {
        let flag = this.play.game.add.sprite(x, y, locale);
        flag.scale.setTo(SimpleGame.SCALE);
        flag.inputEnabled = true;
        flag.events.onInputDown.add(this.switchLocale, this);
    }

    private switchLocale(origin: Phaser.Sprite) {
        Translator.setLocale(<string> origin.key);
    }
}
