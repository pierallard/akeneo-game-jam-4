
import {SceneObject} from "./SceneObject";
import {Action} from "../actions/Action";
import {TalkAction} from "../actions/TalkAction";
import Play from "../state/Play";
import {MoveAction} from "../actions/MoveAction";
import {AddInventoryAction} from "../actions/AddInventoryAction";
import {RemoveInventoryAction} from "../actions/RemoveInventoryAction";
import {SimpleGame} from "../../app";
import {Translator} from "../translations/Translator";

export class Microwave extends SceneObject
{
    constructor(play: Play) {
        super(play, Microwave.IDENTIFIER, 251*SimpleGame.SCALE, 44*SimpleGame.SCALE, 'microOndes');
    }

    protected use(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        let inventoryObject = this.play.getCursor().getInventoryObject();

        if (null !== inventoryObject) {
            if (inventoryObject.getIdentifier() === 'icesteak') {
                return [
                    new MoveAction(this.play, pointer.position.x),
                    new RemoveInventoryAction(this.play, inventoryObject),
                    new AddInventoryAction(this.play, 'steak'),
                    new TalkAction(this.play, this.play.getBaby(), Translator.t('scene.microOndes.success'))
                ];
            }

            return super.use(origin, pointer);
        }
        else {
            return [new TalkAction(this.play, this.play.getBaby(), Translator.t('scene.microOndes.default_use'))];
        }
    }

    static get IDENTIFIER() {
        return 'microOndes';
    }
}
