
import {Action} from "./Action";
import Play from "../state/Play";
import {Pickable} from "../scene_objects/Pickable";

export class TakeAction extends Action
{
    private object: Pickable;

    constructor(play: Play, object: Pickable)
    {
        super(play);

        this.object = object;
    }

    execute(): boolean {
        this.object.destroy();
        this.play.getInventory().addItem(this.object.getGeneratedObjectIdentifier());

        return true;
    }

    debugText(): string {
        return 'Take ' + this.object;
    }
}
