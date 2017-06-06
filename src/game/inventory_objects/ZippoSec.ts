

import {InventoryObject} from "./InventoryObject";
import Play from "../state/Play";
import {SceneObject} from "../scene_objects/SceneObject";
import {Action} from "../actions/Action";
import {BouteilleAlcool} from "./BouteilleAlcool";

export class ZippoSec extends InventoryObject
{
    constructor(play: Play)
    {
        super(play, ZippoSec.IDENTIFIER, 'le zippo sec', 'Il est tout sec!');
    }

    protected mixObjects(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        if (this.play_.getCursor().getInventoryObject().getIdentifier() === BouteilleAlcool.IDENTIFIER) {
            this.play_.getInventory().addItem('zippo');
            this.play_.getInventory().removeItem(this);
            this.play_.getInventory().removeItem(this.play_.getCursor().getInventoryObject());
            this.play_.getCursor().detach();

            return [];
        }

        return super.mixObjects(origin, pointer);
    }

    toFrench(): string {
        return 'le zippo sec';
    }

    static get IDENTIFIER()
    {
        return 'zipposec';
    }
}
