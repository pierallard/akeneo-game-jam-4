
import {SceneObject} from "./SceneObject";
import {Action} from "../actions/Action";
import {Say} from "../actions/Say";
import Play from "../state/Play";
import {MoveAction} from "../actions/MoveAction";
import {AddInventoryAction} from "../actions/AddInventoryAction";
import {RemoveInventoryAction} from "../actions/RemoveInventoryAction";

export class Microondes extends SceneObject
{
    constructor(play: Play) {
        super(play, 233*4, 44*4, 'microOndes');
    }

    protected use(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        let inventoryObject = this.play_.getInventoryObject();

        if (null !== inventoryObject) {
            if (inventoryObject.getIdentifier() === 'icesteak') {
                return [
                    new MoveAction(this.play_, pointer.position.x),
                    new RemoveInventoryAction(this.play_, inventoryObject),
                    new AddInventoryAction(this.play_, 'steak'),
                    new Say(this.play_, this.play_.getBaby(), "Mmmh, on va se regaler...")
                ];
            }

            return super.use(origin, pointer);
        }
        else {
            return [new Say(this.play_, this.play_.getBaby(), "Faut jamais faire tourner un micro-ondes a vide")];
        }
    }
}
