

import {InventoryObject} from "./InventoryObject";
import Play from "../state/Play";
import {SceneObject} from "../scene_objects/SceneObject";
import {Action} from "../actions/Action";
import {Steak} from "./Steak";

export class Lexomil extends InventoryObject
{
    constructor(play: Play)
    {
        super(play, Lexomil.IDENTIFIER, 'Une boite de Lexomil');
    }

    protected mixObjects(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        if (this.play.getCursor().getInventoryObject().getIdentifier() === Steak.IDENTIFIER) {
            this.play.getInventory().activeItem('steaklexomil');
            this.play.getInventory().removeItem(this);
            this.play.getInventory().removeItem(this.play.getCursor().getInventoryObject());
            this.play.getCursor().detach();

            return [];
        }

        return super.mixObjects(origin, pointer);
    }

    static get IDENTIFIER()
    {
        return 'lexomil';
    }

    toFrench(): string {
        return 'du Lexomil';
    }
}
