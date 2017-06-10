

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
        if (this.play.getCursor().getInventoryObject().getIdentifier() === Lamp.IDENTIFIER) {
            this.play.getInventory().activeItem('lampePiles');
            this.play.getInventory().removeItem(this);
            this.play.getInventory().removeItem(this.play.getCursor().getInventoryObject());
            this.play.getCursor().detach();

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
