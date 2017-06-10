
import {SceneObject} from "./SceneObject";
import Play from "../state/Play";
import {MoveAction} from "../actions/MoveAction";
import {Action} from "../actions/Action";
import {BedroomDoor} from "./BedroomDoor";
import {RemoveInventoryAction} from "../actions/RemoveInventoryAction";
import {TalkAction} from "../actions/TalkAction";
import {SimpleGame} from "../../app";

export class Chain extends SceneObject {
    constructor(play: Play) {
        super(play, Chain.IDENTIFIER, 438*SimpleGame.SCALE, 19*SimpleGame.SCALE, 'chaineClose');
    }

    toFrench(): string {
        return 'le verrou';
    }

    static get IDENTIFIER() {
        return 'chain';
    }

    protected use(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        let object = this.play.getCursor().getInventoryObject();
        if (null !== object && object.getIdentifier() === 'escabeauInventory') {
            this.loadTexture('chaineOpen');
            let porteChambre = <BedroomDoor> this.play.getScene().getObject(BedroomDoor.IDENTIFIER);
            porteChambre.doOpen();


            return [
                new MoveAction(this.play, origin.getPosition().x - 1100),
                new RemoveInventoryAction(this.play, object)
            ];
        }

        return [new TalkAction(this.play, this.play.getBaby(), "C'est beaucoup trop haut !")];
    }
}
