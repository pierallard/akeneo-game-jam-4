
import {Action} from './Action';
import Play from "../state/Play";
import {SimpleGame} from "../../app";
import {Baby} from "../Baby";

const LIMIT_CAMERA = 350;

export class MoveAction extends Action {
    private goalX: number;
    private static leftBorder: number = -612;
    private static rightBorder: number = -1036;

    constructor (play: Play, goalX: number)
    {
        super(play);

        this.goalX = goalX;
    }

    execute(): boolean {
        let babyPosition = this.play.getBaby().worldPosition.x;
        if (babyPosition <= LIMIT_CAMERA) {
            let diff = LIMIT_CAMERA - babyPosition;
            if (this.play.getMainGroup().x + diff > MoveAction.leftBorder) {
                diff = -this.play.getMainGroup().x + MoveAction.leftBorder;
            }
            diff = Math.max(diff, - Baby.BABY_SPEED);
            this.play.getMainGroup().x += diff;
            this.goalX += diff;
        } else if (babyPosition >= SimpleGame.WIDTH - LIMIT_CAMERA) {
            let diff = (SimpleGame.WIDTH - LIMIT_CAMERA) - babyPosition;
            if (this.play.getMainGroup().x + diff < MoveAction.rightBorder) {
                diff = -this.play.getMainGroup().x + MoveAction.rightBorder;
            }
            diff = Math.max(diff, - Baby.BABY_SPEED);
            this.play.getMainGroup().x += diff;
            this.goalX += diff;
        }

        return this.play.getBaby().updatePosition(this.goalX - this.play.getMainGroup().x);
    }

    debugText(): string {
        return 'Move to ' + this.goalX;
    }

    static getLimitsCenter(): number
    {
        return (MoveAction.leftBorder + MoveAction.rightBorder) / 2;
    }

    static setLeftBorder(number: number) {
        this.leftBorder = number;
    }

    static setRightBorder(number: number) {
        this.rightBorder = number;
    }
}
