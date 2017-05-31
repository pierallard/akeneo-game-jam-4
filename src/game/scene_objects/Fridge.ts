
import {SceneObject} from "./SceneObject";
import Play from "../state/Play";
import {UpdateAction} from "../actions/UpdateAction";
import {Say} from "../actions/Say";
import {MoveAction} from "../actions/MoveAction";
import {Action} from "../actions/Action";
import {AppearAction} from "../actions/AppearAction";

export class Fridge extends SceneObject {
    private open: boolean = false;

    constructor(play: Play) {
        super(play, 1092, 164, 'fridgeClose');
    }

    protected use(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        if (null !== this.play_.getInventoryObject()) {
            return super.use(origin, pointer);
        }

        let actions: Array<Action> = [
            new MoveAction(this.play_, pointer.position.x)
        ];
        if (this.open) {
            actions.push(new UpdateAction(this.play_, this, 'fridgeClose'));
        } else {
            actions.push(new UpdateAction(this.play_, this, 'fridgeOpen'));
            actions.push(new AppearAction(this.play_, 'coldMeat'));
        }
        this.open = !this.open;

        return actions;
    }

    protected lookAt(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        if (this.open) {
            return [
                new Say(this.play_, this.play_.getBaby(), "Il fait froid la d'dans"),
            ];
        } else {
            return super.lookAt(origin, pointer);
        }
    }
}

