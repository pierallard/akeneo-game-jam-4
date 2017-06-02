

import {InventoryObject} from "./InventoryObject";
import Play from "../state/Play";
import {SceneObject} from "../scene_objects/SceneObject";
import {Action} from "../actions/Action";
import {Steak} from "./Steak";
import {ZippoSec} from "./ZippoSec";

export class BouteilleAlcool extends InventoryObject
{
    constructor(play: Play)
    {
        super(play, BouteilleAlcool.IDENTIFIER, 'la bouteille');
    }

    protected mixObjects(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        if (this.play_.getInventoryObject().getIdentifier() === ZippoSec.IDENTIFIER) {
            this.play_.getInventory().addItem('zippo');
            this.play_.getInventory().removeItem(this);
            this.play_.getInventory().removeItem(this.play_.getInventoryObject());
            this.play_.detachInventoryObject();

            return [];
        }

        return super.mixObjects(origin, pointer);
    }

    static get IDENTIFIER()
    {
        return 'bouteille';
    }

    toFrench(): string {
        return 'la bouteille';
    }
}
