

import {Action} from "./Action";
import Play from "../state/Play";
import {InteractiveObject} from "../InteractiveObject";

export class DisappearAction extends Action {

    private objectIdentifier: string;
    private object: InteractiveObject;

    constructor(play: Play, objectIdentifier: string, object: InteractiveObject = null)
    {
        super(play);

        this.objectIdentifier = objectIdentifier;
        this.object = object;
    }

    execute(): boolean {
        let object = this.object;
        if (null === object) {
            object = this.play.getScene().getObject(this.objectIdentifier);
        }

        if (null !== object) {
            object.hide();
        }

        return true;
    }

    debugText(): string {
        return 'Appear ' + this.objectIdentifier;
    }
}
