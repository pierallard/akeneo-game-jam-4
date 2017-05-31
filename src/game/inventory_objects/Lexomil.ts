

import {InventoryObject} from "./InventoryObject";
import Play from "../state/Play";
import {SceneObject} from "../scene_objects/SceneObject";
import {Action} from "../actions/Action";

export class Lexomil extends InventoryObject
{
    constructor(play: Play)
    {
        super(play, 'lexomil', 'Une boite de Lexomil');
    }

    protected mixObjects(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        this.play_.getInventory().addItem('steakLexomil');
        this.play_.getInventory().removeItem(this);
        this.play_.getInventory().removeItem(this.play_.getInventoryObject());
        this.play_.detachInventoryObject();

        return [];
    }
}
