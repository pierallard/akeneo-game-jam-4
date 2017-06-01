
import {SceneObject} from "./SceneObject";
import Play from "../state/Play";
import {Action} from "../actions/Action";
import {TalkAction} from "../actions/TalkAction";
import {MoveAction} from "../actions/MoveAction";

export class BedroomDoor extends SceneObject {
    private open: boolean = false;

    constructor(play: Play) {
        super(play, BedroomDoor.IDENTIFIER, 441*4, 17*4, 'porteChambre');
    }

    toFrench(): string {
        return 'la porte';
    }

    protected use(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        if (!this.open) {
            return [
                new MoveAction(this.play_, pointer.position.x),
                new TalkAction(this.play_, this.play_.getBaby(), "C'est bloque")
            ];
        }

        return super.use(origin, pointer);
    }

    public doOpen() {
        this.open = true;
        MoveAction.setRightBorder(-1556);
    }

    static get IDENTIFIER()
    {
        return 'bedroomDoor';
    }
}
