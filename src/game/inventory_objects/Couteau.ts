

import {InventoryObject} from "./InventoryObject";
import Play from "../state/Play";
import {SceneObject} from "../scene_objects/SceneObject";
import {Action} from "../actions/Action";
import {Lamp} from "./Lamp";
import {Rallonge} from "./Rallonge";

export class Couteau extends InventoryObject
{
    constructor(play: Play)
    {
        super(play, Couteau.IDENTIFIER, 'un couteau de boucher');
    }

    protected mixObjects(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        if (this.play_.getCursor().getInventoryObject().getIdentifier() === Rallonge.IDENTIFIER) {
            this.play_.getInventory().addItem('rallongecoupee');
            this.play_.getInventory().removeItem(this);
            this.play_.getInventory().removeItem(this.play_.getCursor().getInventoryObject());
            this.play_.getCursor().detach();

            return [];
        }

        return super.mixObjects(origin, pointer);
    }

    static get IDENTIFIER()
    {
        return 'knife';
    }

    toFrench(): string {
        return 'le couteau';
    }
}
