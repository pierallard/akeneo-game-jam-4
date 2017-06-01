
import {SceneObject} from "./SceneObject";
import Play from "../state/Play";
import {MoveAction} from "../actions/MoveAction";
import {Action} from "../actions/Action";
import {BedroomDoor} from "./BedroomDoor";
import {RemoveInventoryAction} from "../actions/RemoveInventoryAction";
import {TalkAction} from "../actions/TalkAction";

export class Chain extends SceneObject {
    constructor(play: Play) {
        super(play, Chain.IDENTIFIER, 450*4, 17*4, 'chaineClose');
    }

    toFrench(): string {
        return 'le verrou';
    }

    static get IDENTIFIER() {
        return 'chain';
    }

    protected use(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        let object = this.play_.getInventoryObject();
        if (null !== object && object.getIdentifier() === 'escabeauInventory') {
            this.loadTexture('chaineOpen');
            let porteChambre = <BedroomDoor> this.play_.getMainGroup().getObject(BedroomDoor.IDENTIFIER);
            porteChambre.doOpen();


            return [
                new MoveAction(this.play_, origin.position.x - 1100),
                new RemoveInventoryAction(this.play_, object)
            ];
        }

        return [new TalkAction(this.play_, this.play_.getBaby(), "C'est beaucoup trop haut !")];
    }
}
