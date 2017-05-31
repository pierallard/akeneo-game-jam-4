
import {SceneObject} from "./SceneObject";
import Play from "../state/Play";
import {Action} from "../actions/Action";
import {TalkAction} from "../actions/TalkAction";
import {MoveAction} from "../actions/MoveAction";
import {Dog} from "./Dog";

export class GarageDoor extends SceneObject {
    private open: boolean = false;

    constructor(play: Play) {
        super(play, GarageDoor.IDENTIFIER, 156*4, 11*4, 'porteGarage');
    }

    protected use(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        if (!open) {
            return [
                new MoveAction(this.play_, pointer.position.x),
                new TalkAction(this.play_, this.play_.getMainGroup().getObject(Dog.IDENTIFIER), 'Ouaf!')
            ];
        }
        return super.use(origin, pointer);
    }

    public doOpen() {
        this.open = true;
        MoveAction.setLeftBorder(0);
    }

    static get IDENTIFIER()
    {
        return 'porteGarage';
    }
}
