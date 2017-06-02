

import {InventoryObject} from "./InventoryObject";
import Play from "../state/Play";
import {SceneObject} from "../scene_objects/SceneObject";
import {Action} from "../actions/Action";
import {Lamp} from "./Lamp";
import {Cannabis} from "./Cannabis";

export class Tabac extends InventoryObject
{
    constructor(play: Play)
    {
        super(play, Tabac.IDENTIFIER, 'Je joue de la trompette');
    }

    protected mixObjects(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        if (this.play_.getInventoryObject().getIdentifier() === Cannabis.IDENTIFIER) {
            this.play_.getInventory().addItem('tabacbeuh');
            this.play_.getInventory().removeItem(this);
            this.play_.getInventory().removeItem(this.play_.getInventoryObject());
            this.play_.detachInventoryObject();

            return [];
        }

        return super.mixObjects(origin, pointer);
    }

    static get IDENTIFIER()
    {
        return 'tabac';
    }

    toFrench(): string {
        return 'le tabac';
    }
}
