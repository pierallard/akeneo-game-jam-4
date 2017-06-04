

import {InventoryObject} from "./InventoryObject";
import Play from "../state/Play";
import {SceneObject} from "../scene_objects/SceneObject";
import {Action} from "../actions/Action";
import {Lamp} from "./Lamp";
import {Couteau} from "./Couteau";

export class Rallonge extends InventoryObject
{
    constructor(play: Play)
    {
        super(play, Rallonge.IDENTIFIER, 'une rallonge electrique');
    }

    protected mixObjects(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        if (this.play_.getInventoryObject().getIdentifier() === Couteau.IDENTIFIER) {
            this.play_.getInventory().addItem('rallongecoupee');
            this.play_.getInventory().removeItem(this);
            this.play_.getInventory().removeItem(this.play_.getInventoryObject());
            this.play_.detachInventoryObject();

            return [];
        }

        return super.mixObjects(origin, pointer);
    }

    static get IDENTIFIER()
    {
        return 'rallonge';
    }

    toFrench(): string {
        return 'la rallonge';
    }
}
