

import {InventoryObject} from "./InventoryObject";
import Play from "../state/Play";
import {SceneObject} from "../scene_objects/SceneObject";
import {Action} from "../actions/Action";
import {Battery} from "./Battery";

export class Lamp extends InventoryObject
{
    constructor(play: Play)
    {
        super(play, Lamp.IDENTIFIER);
    }

    protected mixObjects(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        if (this.play.getCursor().getInventoryObject().getIdentifier() === Battery.IDENTIFIER) {

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
        return 'neon';
    }
}
