
import {Action} from './Action';
import Play from "../state/Play";

export class MoveAction extends Action {

    private goalX: number;

    constructor (play: Play, goalX: number)
    {
        super(play);

        this.goalX = goalX;
    }

    execute(): boolean {
        return this.play.getBaby().updatePosition(this.goalX);
    }
}
