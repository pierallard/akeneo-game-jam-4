
import {Action} from "./Action";
import Play from "../state/Play";
import {SceneObject} from "../scene_objects/SceneObject";

export class UpdateAction extends Action
{
    private newTexture: string;
    private origin: SceneObject;

    constructor(play: Play, origin: SceneObject, newTexture: string)
    {
        super(play);

        this.origin = origin;
        this.newTexture = newTexture;
    }

    execute(): boolean {
        this.origin.loadTexture(this.newTexture);
        this.origin.update();

        return true;
    }

    debugText(): string {
        return 'Update ' + this.newTexture;
    }
}
