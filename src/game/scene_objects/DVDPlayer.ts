
import {SceneObject} from "./SceneObject";
import Play from "../state/Play";
import {Action} from "../actions/Action";
import {MoveAction} from "../actions/MoveAction";
import {RemoveInventoryAction} from "../actions/RemoveInventoryAction";
import {Father} from "./Father";
import {SimpleGame} from "../../app";

export class DVDPlayer extends SceneObject {
    constructor(play: Play) {
        super(play, DVDPlayer.IDENTIFIER, 420*SimpleGame.SCALE, 44*SimpleGame.SCALE, 'dvdplayer');
    }

    toFrench(): string {
        return 'le lecteur DVD';
    }

    protected use(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        let object = this.play.getCursor().getInventoryObject();
        if (null !== object && object.getIdentifier() === 'dvdporno') {
            let father = <Father> this.play.getScene().getObject(Father.IDENTIFIER);
            father.setBusy();

            return [
                new MoveAction(this.play, pointer.position.x),
                new RemoveInventoryAction(this.play, object)
            ]
        }
        return super.use(origin, pointer);
    }

    static get IDENTIFIER()
    {
        return 'dvdplayer';
    }
}
