
import {SceneObject} from "./SceneObject";
import Play from "../state/Play";
import {Action} from "../actions/Action";
import {TalkAction} from "../actions/TalkAction";
import {MoveAction} from "../actions/MoveAction";

export class Bouteille extends SceneObject {
    constructor(play: Play) {
        super(play, Bouteille.IDENTIFIER, 382*4, 41*4, 'bouteille');
    }

    toFrench(): string {
        return 'la bouteille';
    }

    protected pickUp(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        // TODO
        return [
            new MoveAction(this.play_, pointer.position.x),
            new TalkAction(this.play_, this.play_.getBaby(), "Touche pas a ca fils de pute!"),
            new TalkAction(this.play_, this.play_.getBaby(), "Faudrait que je detourne son attention...")
        ];
    }

    static get IDENTIFIER()
    {
        return 'bouteille';
    }
}
