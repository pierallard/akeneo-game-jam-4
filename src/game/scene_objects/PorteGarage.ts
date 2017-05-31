
import {SceneObject} from "./SceneObject";
import Play from "../state/Play";
import {Action} from "../actions/Action";
import {Say} from "../actions/Say";
import {MoveAction} from "../actions/MoveAction";

export class PorteGarage extends SceneObject {
    private open: boolean = false;

    constructor(play: Play) {
        super(play, 'porteGarage', 156*4, 11*4, 'porteGarage');
    }

    protected use(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        if (!open) {
            return [
                new MoveAction(this.play_, pointer.position.x),
                new Say(this.play_, this.play_.mainGroupObject('dog'), 'Ouaf!')
            ];
        }
        return super.use(origin, pointer);
    }

    public doOpen() {
        this.open = true;
        MoveAction.setLeftBorder(0);
    }
}
