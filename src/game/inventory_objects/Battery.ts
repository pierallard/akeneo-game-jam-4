

import {InventoryObject} from "./InventoryObject";
import Play from "../state/Play";
import {SceneObject} from "../scene_objects/SceneObject";
import {Action} from "../actions/Action";
import {Lamp} from "./Lamp";

export class Battery extends InventoryObject
{
    constructor(play: Play)
    {
        super(play, Battery.IDENTIFIER, '"3500 mAh"');
    }

    protected mixObjects(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        if (this.play_.getInventoryObject().getIdentifier() === Lamp.IDENTIFIER) {
            this.play_.getInventory().addItem('lampePiles');
            this.play_.getInventory().removeItem(this);
            this.play_.getInventory().removeItem(this.play_.getInventoryObject());
            this.play_.detachInventoryObject();

            return [];
        }

        return super.mixObjects(origin, pointer);
    }

    static get IDENTIFIER()
    {
        return 'piles';
    }

    toFrench(): string {
        return 'les piles';
    }
}
