

import {Action} from "./Action";
import Play from "../state/Play";

export class ChangeVerbAction extends Action {
    private verb: string;

    constructor (play: Play, verb: string)
    {
        super(play);

        this.verb = verb;
    }

    execute(): boolean {
        this.play.setVerb(this.verb);

        return true;
    }

    debugText(): string {
        return 'Change verb to ' + this.verb;
    }
}
