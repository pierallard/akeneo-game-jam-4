
import {SceneObject} from "./SceneObject";
import Play from "../state/Play";
import {UpdateAction} from "../actions/UpdateAction";
import {TalkAction} from "../actions/TalkAction";
import {MoveAction} from "../actions/MoveAction";
import {Action} from "../actions/Action";
import {AppearAction} from "../actions/AppearAction";
import {SimpleGame} from "../../app";

export class Cupboard extends SceneObject {
    private open: boolean = false;

    constructor(play: Play) {
        super(play, Cupboard.IDENTIFIER, 270*SimpleGame.SCALE, 43*SimpleGame.SCALE, 'placardClose');
    }

    protected use(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        if (null !== this.play.getCursor().getInventoryObject()) {
            return super.use(origin, pointer);
        }

        let actions: Array<Action> = [
            new MoveAction(this.play, pointer.position.x)
        ];

        if (this.open) {
            actions.push(new UpdateAction(this.play, this, 'placardClose'));
        } else {
            actions.push(new UpdateAction(this.play, this, 'placardOpen'));
            actions.push(new AppearAction(this.play, 'engrais'));
        }
        this.open = !this.open;

        return actions;
    }

    static get IDENTIFIER() {
        return 'cupboard';
    }

    getLabel(): string {
        return 'le placard';
    }
}

