
import {SceneObject} from "./SceneObject";
import Play from "../state/Play";
import {MoveAction} from "../actions/MoveAction";
import {RemoveInventoryAction} from "../actions/RemoveInventoryAction";
import {AddInventoryAction} from "../actions/AddInventoryAction";
import {Action} from "../actions/Action";
import {TalkAction} from "../actions/TalkAction";
import {SimpleGame} from "../../app";

export class Four extends SceneObject
{
    private on: boolean;

    constructor(play: Play) {
        super(play, Four.IDENTIFIER, 233*SimpleGame.SCALE, 44*SimpleGame.SCALE, 'four');

        this.on = false;
    }

    protected lookAt(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        if (!this.on) {
            return [new TalkAction(this.play_, this.play_.getBaby(), "J'ai l'impression qu'il n'a pas d'electricite...")];
        }

        return super.lookAt(origin, pointer);
    }

    protected use(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        if (!this.on) {
            return [new TalkAction(this.play_, this.play_.getBaby(), "Le four n'a pas l'air de vouloir s'allumer")];
        }

        let object = this.play_.getCursor().getInventoryObject();
        if (null !== object) {
            if (object.getIdentifier() === 'gode') {
                return [
                    new MoveAction(this.play_, pointer.position.x),
                    new RemoveInventoryAction(this.play_, object),
                    new AddInventoryAction(this.play_, 'piles'),
                    new TalkAction(this.play_, this.play_.getBaby(), 'Ca sent le crame maintenant, bravo'),
                ];
            }
        }

        return super.use(origin, pointer);
    }

    static get IDENTIFIER() {
        return 'four';
    }

    public doOn() {
        this.on = true;
    }

    toFrench(): string {
        return 'le four';
    }
}
