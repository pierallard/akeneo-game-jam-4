
import {SceneObject} from "./SceneObject";
import Play from "../state/Play";
import {MoveAction} from "../actions/MoveAction";
import {RemoveInventoryAction} from "../actions/RemoveInventoryAction";
import {AddInventoryAction} from "../actions/AddInventoryAction";
import {Action} from "../actions/Action";
import {TalkAction} from "../actions/TalkAction";
import {SimpleGame} from "../../app";
import {Translator} from "../translations/Translator";

export class Four extends SceneObject
{
    private on: boolean;

    constructor(play: Play) {
        super(play, Four.IDENTIFIER, 233*SimpleGame.SCALE, 44*SimpleGame.SCALE, 'four');

        this.on = false;
    }

    protected lookAt(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        if (!this.on) {
            return [new TalkAction(this.play, this.play.getBaby(), Translator.t('scene.four.look_off'))];
        }

        return super.lookAt(origin, pointer);
    }

    protected use(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        if (!this.on) {
            return [new TalkAction(this.play, this.play.getBaby(), Translator.t('scene.four.use_off'))];
        }

        let object = this.play.getCursor().getInventoryObject();
        if (null !== object) {
            if (object.getIdentifier() === 'gode') {
                return [
                    new MoveAction(this.play, pointer.position.x),
                    new RemoveInventoryAction(this.play, object),
                    new AddInventoryAction(this.play, 'piles'),
                    new TalkAction(this.play, this.play.getBaby(), Translator.t('scene.four.success')),
                ];
            }
        }

        return super.use(origin, pointer);
    }

    static get IDENTIFIER() {
        return 'four';
    }

    public doOn() {
        this.on = true;
    }
}
