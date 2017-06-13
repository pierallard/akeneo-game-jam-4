
import {SceneObject} from "./SceneObject";
import Play from "../state/Play";
import {Action} from "../actions/Action";
import {TalkAction} from "../actions/TalkAction";
import {MoveAction} from "../actions/MoveAction";
import {SimpleGame} from "../../app";
import {Translator} from "../translations/Translator";

export class BedroomDoor extends SceneObject {
    private open: boolean = false;

    constructor(play: Play) {
        super(play, BedroomDoor.IDENTIFIER, 441*SimpleGame.SCALE, 11*SimpleGame.SCALE, 'porteChambre');
    }

    protected use(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        if (!this.open) {
            return [
                new MoveAction(this.play, pointer.position.x),
                new TalkAction(this.play, this.play.getBaby(), Translator.t('scene.bedroomDoor.default_use'))
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
