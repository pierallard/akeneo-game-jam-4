
import {SceneObject} from "./SceneObject";
import Play from "../state/Play";
import {MoveAction} from "../actions/MoveAction";
import {RemoveInventoryAction} from "../actions/RemoveInventoryAction";
import {AddInventoryAction} from "../actions/AddInventoryAction";
import {Action} from "../actions/Action";
import {TalkAction} from "../actions/TalkAction";

export class Four extends SceneObject
{
    constructor(play: Play) {
        super(play, 'four', 233*4, 44*4, 'four');
    }

    protected use(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        let object = this.play_.getInventoryObject();
        if (null !== object) {
            if (object.getIdentifier() === 'gode') {
                return [
                    new MoveAction(this.play_, pointer.position.x),
                    new RemoveInventoryAction(this.play_, object),
                    new AddInventoryAction(this.play_, 'piles'),
                    new TalkAction(this.play_, this.play_.getBaby(), 'Ca sent le crame maintenant, bravo'),
                ];
            }
        }

        return super.use(origin, pointer);
    }

    toFrench(): string {
        return 'le four';
    }
}
