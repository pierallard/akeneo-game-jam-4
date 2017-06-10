

import {InventoryObject} from "./InventoryObject";
import Play from "../state/Play";
import {SceneObject} from "../scene_objects/SceneObject";
import {Action} from "../actions/Action";
import {Lamp} from "./Lamp";
import {TabacBeuh} from "./TabacBeuh";

export class Feuilles extends InventoryObject
{
    constructor(play: Play)
    {
        super(play, Feuilles.IDENTIFIER, '"3500 mAh"');
    }

    protected mixObjects(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        if (this.play.getCursor().getInventoryObject().getIdentifier() === TabacBeuh.IDENTIFIER) {
            this.play.getInventory().activeItem('bedo');
            this.play.getInventory().removeItem(this);
            this.play.getInventory().removeItem(this.play.getCursor().getInventoryObject());
            this.play.getCursor().detach();

            return [];
        }

        return super.mixObjects(origin, pointer);
    }

    static get IDENTIFIER()
    {
        return 'feuilles';
    }

    toFrench(): string {
        return 'la feuille a rouler';
    }
}
