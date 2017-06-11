
import {SceneObject} from "./SceneObject";
import Play from "../state/Play";
import {Action} from "../actions/Action";
import {TalkAction} from "../actions/TalkAction";
import {MoveAction} from "../actions/MoveAction";
import {Father} from "./Father";
import {AddInventoryAction} from "../actions/AddInventoryAction";
import {BouteilleAlcool} from "../inventory_objects/BouteilleAlcool";
import {RemoveInventoryAction} from "../actions/RemoveInventoryAction";
import {DisappearAction} from "../actions/DisappearAction";
import {SimpleGame} from "../../app";

export class Bouteille extends SceneObject {
    constructor(play: Play) {
        super(play, Bouteille.IDENTIFIER, 382*SimpleGame.SCALE, 41*SimpleGame.SCALE, 'bouteille');
    }

    toFrench(): string {
        return "la bouteille d'eau de vie";
    }

    protected pickUp(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        let father = <Father> this.play.getScene().getObject(Father.IDENTIFIER);
        if (!father.isBusy()) {
            return [
                new MoveAction(this.play, pointer.position.x),
                new TalkAction(this.play, father, "Touche pas a ca fils de pute!"),
                new TalkAction(this.play, this.play.getBaby(), "Faudrait que je detourne son attention...")
            ];
        }
        else {
            return [
                new MoveAction(this.play, pointer.position.x),
                new DisappearAction(this.play, Bouteille.IDENTIFIER),
                new AddInventoryAction(this.play, BouteilleAlcool.IDENTIFIER),
                new TalkAction(this.play, this.play.getBaby(), "Fais moi penser a gouter!")
            ];
        }
    }

    static get IDENTIFIER()
    {
        return 'bouteille';
    }
}
