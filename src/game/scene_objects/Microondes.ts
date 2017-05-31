
import {SceneObject} from "./SceneObject";
import {Action} from "../actions/Action";
import {Say} from "../actions/Say";
import Play from "../state/Play";

export class Microondes extends SceneObject
{
    constructor(play: Play) {
        super(play, 233*4, 44*4, 'microOndes');
    }

    protected use(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        let inventoryObject = this.play_.getInventoryObject();

        if (null !== inventoryObject) {
            if (inventoryObject.getIdentifier() === 'icesteak') {
                this.play_.getInventory().addItem('steak');
                this.play_.getInventory().removeItem(inventoryObject);

                return [new Say(this.play_, this.play_.getBaby(), "Mmmh, on va se regaler...")];
            }

            return super.use(origin, pointer);
        }
        else {
            return [new Say(this.play_, this.play_.getBaby(), "Faut jamais faire tourner un micro-ondes a vide")];
        }
    }
}
