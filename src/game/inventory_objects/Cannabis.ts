

import {InventoryObject} from "./InventoryObject";
import Play from "../state/Play";
import {SceneObject} from "../scene_objects/SceneObject";
import {Action} from "../actions/Action";
import {Lamp} from "./Lamp";
import {Tabac} from "./Tabac";

export class Cannabis extends InventoryObject
{
    constructor(play: Play)
    {
        super(play, Cannabis.IDENTIFIER, 'Ca sent bon!');
    }

    protected mixObjects(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        if (this.play_.getCursor().getInventoryObject().getIdentifier() === Tabac.IDENTIFIER) {
            this.play_.getInventory().addItem('tabacbeuh');
            this.play_.getInventory().removeItem(this);
            this.play_.getInventory().removeItem(this.play_.getCursor().getInventoryObject());
            this.play_.getCursor().detach();

            return [];
        }

        return super.mixObjects(origin, pointer);
    }

    static get IDENTIFIER()
    {
        return 'cannabis';
    }

    toFrench(): string {
        return 'la weed';
    }
}
