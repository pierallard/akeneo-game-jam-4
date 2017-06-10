

import {InventoryObject} from "./InventoryObject";
import Play from "../state/Play";
import {SceneObject} from "../scene_objects/SceneObject";
import {Action} from "../actions/Action";
import {Lamp} from "./Lamp";
import {Feuilles} from "./Feuilles";

export class TabacBeuh extends InventoryObject
{
    constructor(play: Play)
    {
        super(play, TabacBeuh.IDENTIFIER, 'Bien dose!');
    }

    protected mixObjects(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        if (this.play.getCursor().getInventoryObject().getIdentifier() === Feuilles.IDENTIFIER) {
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
        return 'tabacbeuh';
    }

    toFrench(): string {
        return 'le melange';
    }
}
