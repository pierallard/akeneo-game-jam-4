
import {Action} from './Action';
import Play from "../state/Play";
import {SimpleGame} from "../../app";

const LIMIT_CAMERA = 350;

export class MoveAction extends Action {
    private goalX: number;
    private static leftBorder: number = -612;
    private static rightBorder: number = -1040;

    constructor (play: Play, goalX: number)
    {
        super(play);

        this.goalX = goalX;
    }

    execute(): boolean {
        let babyPosition = this.play.getBaby().worldPosition.x;
        if (babyPosition <= LIMIT_CAMERA) {
            let diff = LIMIT_CAMERA - babyPosition;
            if (this.play.mainGroup.x + diff > MoveAction.leftBorder) {
                diff = - this.play.mainGroup.x + MoveAction.leftBorder;
            }
            this.play.mainGroup.x += diff;
            this.goalX += diff;
        } else if (babyPosition >= SimpleGame.WIDTH - LIMIT_CAMERA) {
            let diff = (SimpleGame.WIDTH - LIMIT_CAMERA) - babyPosition;
            if (this.play.mainGroup.x + diff < MoveAction.rightBorder) {
                diff = - this.play.mainGroup.x + MoveAction.rightBorder;
            }
            this.play.mainGroup.x += diff;
            this.goalX += diff;
        }

        return this.play.getBaby().updatePosition(this.goalX - this.play.mainGroup.x);
    }

    debugText(): string {
        return 'Move to ' + this.goalX;
    }

    static getLimitsCenter(): number
    {
        return (MoveAction.leftBorder + MoveAction.rightBorder) / 2;
    }
}
