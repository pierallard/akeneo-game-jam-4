
import {SceneObject} from "./SceneObject";
import Play from "../state/Play";
import {Action} from "../actions/Action";
import {TalkAction} from "../actions/TalkAction";
import {MoveAction} from "../actions/MoveAction";
import {SimpleGame} from "../../app";

export class BedroomDoor extends SceneObject {
    private open: boolean = false;

    constructor(play: Play) {
        super(play, BedroomDoor.IDENTIFIER, 441*SimpleGame.SCALE, 11*SimpleGame.SCALE, 'porteChambre');
    }

    getLabel(): string {
        return 'la porte';
    }

    protected use(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        if (!this.open) {
            return [
                new MoveAction(this.play, pointer.position.x),
                new TalkAction(this.play, this.play.getBaby(), "C'est bloque par un verrou")
            ];
        }

        return super.use(origin, pointer);
    }

    public doOpen() {
        this.open = true;
        this.sprite.loadTexture('porteChambreOpen');
        MoveAction.setRightBorder(-1556);
    }

    static get IDENTIFIER()
    {
        return 'bedroomDoor';
    }
}
