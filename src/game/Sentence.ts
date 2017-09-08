
import {SceneObject} from "./scene_objects/SceneObject";
import {Verb} from "./verbs/Verb";
import {SimpleGame} from "../app";
import {Translator} from "./translations/Translator";

export class Sentence extends Phaser.Text {
    private object: SceneObject;
    private secondaryObject: SceneObject;
    private verb: Verb;

    
    constructor(game: Phaser.Game) {
        let style = {
            font: "28px 3dventuremedium",
            align: "center",
            fill: '#639bff',
            wordWrapWidth: 400 - 12*SimpleGame.SCALE,
            wordWrap: true,
        };

        super(game, (400 - 12*SimpleGame.SCALE)/2, 310, '', style);

        this.object = null;
        this.verb = null;
        this.secondaryObject = null;
        this.lineSpacing = -15;

        this.game.add.existing(this);
        this.anchor.setTo(0.5, 0.5);
    }

    setObject(object: SceneObject) {
        this.object = object;

        this.update();
    }

    setSecondaryObject(object: SceneObject) {
        this.secondaryObject = object;

        this.update();
    }

    setVerb(verb: Verb) {
        this.verb = verb;

        this.update();
    }

    update() {
        let result = '';
        if (null !== this.verb) {
            result = result + this.verb.getLabel();
            if (null !== this.object) {
                result = result + ' ' + this.object.getLabel();
                if (null !== this.secondaryObject) {
                    result = result + ' ' + Translator.translations[Translator.locale]['conjunctions']['with'] + ' ' + this.secondaryObject.getLabel();
                }
            }
        }

        this.text = result;
    }
}
