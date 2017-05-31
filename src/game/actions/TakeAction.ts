
import {Action} from "./Action";
import Play from "../state/Play";
import {PickableObject} from "../scene_objects/PickableObject";

export class TakeAction extends Action
{
    private object: PickableObject;

    constructor(play: Play, object: PickableObject)
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
