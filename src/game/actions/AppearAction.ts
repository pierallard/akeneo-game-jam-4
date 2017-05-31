

import {Action} from "./Action";
import Play from "../state/Play";

export class AppearAction extends Action {

    private objectIdentifier: string;

    constructor(play: Play, objectIdentifier: string)
    {
        super(play);

        this.objectIdentifier = objectIdentifier;
    }

    execute(): boolean {
        let object = this.play.getMainGroup().getObject(this.objectIdentifier);
        if (null !== object) {
            object.display();
        }

        return true;
    }

    debugText(): string {
        return 'Appear ' + this.objectIdentifier;
    }


}
