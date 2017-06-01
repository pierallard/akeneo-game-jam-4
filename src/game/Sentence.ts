
import {SceneObject} from "./scene_objects/SceneObject";
import {Verb} from "./verbs/Verb";

export class Sentence extends Phaser.Text {
    private object: SceneObject;
    private secondaryObject: SceneObject;
    private verb: Verb;
    
    constructor(game: Phaser.Game) {
        let style = {
            font: "32px 3dventuremedium",
            align: "center",
            fill: '#639bff',
            wordWrapWidth: 400,
            wordWrap: true,
        };

        super(game, 200, 310, '', style);

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
            result = result + this.verb.toFrench();
            if (null !== this.object) {
                result = result + ' ' + this.object.toFrench();
                if (null !== this.secondaryObject) {
                    result = result + ' avec ' + this.secondaryObject.toFrench();
                }
            }
        }

        this.text = result;
    }
}
