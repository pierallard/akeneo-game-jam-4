

import {InventoryObject} from "./InventoryObject";
import Play from "../state/Play";
import {SceneObject} from "../scene_objects/SceneObject";
import {Action} from "../actions/Action";
import {Lamp} from "./Lamp";
import {Couteau} from "./Couteau";
import {TalkAction} from "../actions/TalkAction";

export class Rallonge extends InventoryObject
{
    constructor(play: Play)
    {
        super(play, Rallonge.IDENTIFIER);
    }

    protected mixObjects(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        if (this.play.getCursor().getInventoryObject().getIdentifier() === Couteau.IDENTIFIER) {
            this.play.getInventory().activeItem('rallongecoupee');
            this.play.getInventory().removeItem(this);
            this.play.getInventory().removeItem(this.play.getCursor().getInventoryObject());
            this.play.getCursor().detach();

            return [];
        }
        if (this.play.getCursor().getInventoryObject().getIdentifier() === Lamp.IDENTIFIER) {
            return [new TalkAction(this.play, this.play.getBaby(), "C'est une lampe 12V, pas 220V")];
        }

        return super.mixObjects(origin, pointer);
    }

    static get IDENTIFIER()
    {
        return 'rallonge';
    }
}
