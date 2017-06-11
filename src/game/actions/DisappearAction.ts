

import {Action} from "./Action";
import Play from "../state/Play";

export class DisappearAction extends Action {

    private objectIdentifier: string;

    constructor(play: Play, objectIdentifier: string)
    {
        super(play);

        this.objectIdentifier = objectIdentifier;
    }

    execute(): boolean {
        let object = this.play.getScene().getObject(this.objectIdentifier);
        if (null !== object) {
            object.hide();
        }

        return true;
    }

    debugText(): string {
        return 'Appear ' + this.objectIdentifier;
    }


}
