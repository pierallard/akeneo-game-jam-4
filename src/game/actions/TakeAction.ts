
import {Action} from "./Action";
import Play from "../state/Play";
import {Pickable} from "../Pickable";

export class TakeAction extends Action
{
    private object: Pickable;

    constructor(play: Play, object: Pickable)
    {
        super(play);

        this.object = object;
    }

    execute(): boolean {
        this.play.removeObject(this.object);
        this.play.getInventory().addItem(this.object.getInventoryImage());

        return true;
    }

    debugText(): string {
        return 'Take ' + this.object;
    }
}
