
import {SceneObject} from "./SceneObject";
import Play from "../state/Play";
import {MoveAction} from "../actions/MoveAction";
import {Action} from "../actions/Action";
import {RemoveInventoryAction} from "../actions/RemoveInventoryAction";
import {TalkAction} from "../actions/TalkAction";
import {Four} from "./Four";
import {Rallonge} from "../inventory_objects/Rallonge";
import {UpdateAction} from "../actions/UpdateAction";
import {SimpleGame} from "../../app";
import {Translator} from "../translations/Translator";

export class Prise extends SceneObject {
    constructor(play: Play) {
        super(play, Prise.IDENTIFIER, 175*SimpleGame.SCALE, 57*SimpleGame.SCALE, 'prisepetee');
    }

    static get IDENTIFIER() {
        return 'prise';
    }

    protected use(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        let object = this.play.getCursor().getInventoryObject();
        if (null !== object) {
            if (object.getIdentifier() === Rallonge.IDENTIFIER) {
                return [new TalkAction(this.play, this.play.getBaby(), Translator.t('scene.prise.tip'))];
            }
            if (object.getIdentifier() === 'rallongecoupee') {
                this.loadTexture('prise');
                let four = <Four> this.play.getScene().getObject(Four.IDENTIFIER);
                four.doOn();

                return [
                    new MoveAction(this.play, origin.getPosition().x - 500),
                    new RemoveInventoryAction(this.play, object),
                    new UpdateAction(this.play, this, 'prise'),
                    new TalkAction(this.play, this.play.getBaby(), Translator.t('scene.prise.success'))
                ];
            }
        }

        return [new TalkAction(this.play, this.play.getBaby(), Translator.t('scene.prise.default_use'))];
    }
}
