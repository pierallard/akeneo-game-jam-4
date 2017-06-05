
import {SceneObject} from "./SceneObject";
import Play from "../state/Play";
import {MoveAction} from "../actions/MoveAction";
import {Action} from "../actions/Action";
import {BedroomDoor} from "./BedroomDoor";
import {RemoveInventoryAction} from "../actions/RemoveInventoryAction";
import {TalkAction} from "../actions/TalkAction";
import {Four} from "./Four";
import {Rallonge} from "../inventory_objects/Rallonge";
import {UpdateAction} from "../actions/UpdateAction";

export class Prise extends SceneObject {
    constructor(play: Play) {
        super(play, Prise.IDENTIFIER, 175*4, 57*4, 'prisepetee');
    }

    toFrench(): string {
        return 'la prise cassee';
    }

    static get IDENTIFIER() {
        return 'prise';
    }

    protected use(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        let object = this.play_.getInventoryObject();
        if (null !== object) {
            if (object.getIdentifier() === Rallonge.IDENTIFIER) {
                return [new TalkAction(this.play_, this.play_.getBaby(), "Faudrait que je denude les fils avant")];
            }
            if (object.getIdentifier() === 'rallongecoupee') {
                this.loadTexture('prise');
                let four = <Four> this.play_.getMainGroup().getObject(Four.IDENTIFIER);
                four.doOn();

                return [
                    new MoveAction(this.play_, origin.position.x - 500),
                    new RemoveInventoryAction(this.play_, object),
                    new UpdateAction(this.play_, this, 'prise'),
                    new TalkAction(this.play_, this.play_.getBaby(), "Le four marche! On va pouvoir faire fondre des trucs!")
                ];
            }
        }

        return [new TalkAction(this.play_, this.play_.getBaby(), "Aie! Y'a du jus dedans, c'est sur.")];
    }
}
