

import {InventoryObject} from "./InventoryObject";
import Play from "../state/Play";
import {SceneObject} from "../scene_objects/SceneObject";
import {Action} from "../actions/Action";
import {Lexomil} from "./Lexomil";

export class Steak extends InventoryObject
{
    constructor(play: Play)
    {
        super(play, Steak.IDENTIFIER, 'Un bon gros steak');
    }

    protected mixObjects(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        if (this.play_.getInventoryObject().getIdentifier() === Lexomil.IDENTIFIER) {

            this.play_.getInventory().addItem('steakLexomil');
            this.play_.getInventory().removeItem(this);
            this.play_.getInventory().removeItem(this.play_.getInventoryObject());
            this.play_.detachInventoryObject();

            return [];
        }

        return super.mixObjects(origin, pointer);
    }

    static get IDENTIFIER()
    {
        return 'steak';
    }
}
