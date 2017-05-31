

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
        this.play.appearObject(this.objectIdentifier);

        return true;
    }

    debugText(): string {
        return 'Appear ' + this.objectIdentifier;
    }


}
