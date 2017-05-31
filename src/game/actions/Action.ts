
import Play from "../state/Play";

export abstract class Action {

    protected play: Play;

    constructor (play: Play)
    {
        this.play = play;
    }

    abstract execute(): boolean;
}
