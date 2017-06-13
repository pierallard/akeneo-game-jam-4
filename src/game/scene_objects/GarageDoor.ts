
import {SceneObject} from "./SceneObject";
import Play from "../state/Play";
import {Action} from "../actions/Action";
import {TalkAction} from "../actions/TalkAction";
import {MoveAction} from "../actions/MoveAction";
import {Dog} from "./Dog";
import {SimpleGame} from "../../app";
import {Translator} from "../translations/Translator";

export class GarageDoor extends SceneObject {
    private open: boolean = false;

    constructor(play: Play) {
        super(play, GarageDoor.IDENTIFIER, 158*SimpleGame.SCALE, 11*SimpleGame.SCALE, 'porteGarage');
    }

    protected use(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        if (!this.open) {
            return [
                new MoveAction(this.play, pointer.position.x),
                new TalkAction(this.play, this.play.getScene().getObject(Dog.IDENTIFIER), Translator.t('scene.porteGarage.dog')),
                new TalkAction(this.play, this.play.getBaby(), Translator.t('scene.porteGarage.baby'))
            ];
        }
        return super.use(origin, pointer);
    }

    public doOpen() {
        this.open = true;
        this.loadTexture('porteGarageOpen');
        MoveAction.setLeftBorder(0);
    }

    static get IDENTIFIER()
    {
        return 'porteGarage';
    }
}
