

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
        super(play, Rallonge.IDENTIFIER, 'une rallonge electrique');
    }

    protected mixObjects(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        if (this.play_.getCursor().getInventoryObject().getIdentifier() === Couteau.IDENTIFIER) {
            this.play_.getInventory().addItem('rallongecoupee');
            this.play_.getInventory().removeItem(this);
            this.play_.getInventory().removeItem(this.play_.getCursor().getInventoryObject());
            this.play_.getCursor().detach();

            return [];
        }
        if (this.play_.getCursor().getInventoryObject().getIdentifier() === Lamp.IDENTIFIER) {
            return [new TalkAction(this.play_, this.play_.getBaby(), "C'est une lampe 12V, pas 220V")];
        }

        return super.mixObjects(origin, pointer);
    }

    static get IDENTIFIER()
    {
        return 'rallonge';
    }

    toFrench(): string {
        return 'la rallonge';
    }
}
