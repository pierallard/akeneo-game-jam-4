
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
import {Translator} from "../translations/Translator";

export class Bouteille extends SceneObject {
    constructor(play: Play) {
        super(play, Bouteille.IDENTIFIER, 382*SimpleGame.SCALE, 41*SimpleGame.SCALE, 'bouteille');
    }

    protected pickUp(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        let father = <Father> this.play.getScene().getObject(Father.IDENTIFIER);
        if (!father.isBusy()) {
            return [
                new MoveAction(this.play, pointer.position.x),
                new TalkAction(this.play, father, Translator.t('scene.bouteille.father')),
                new TalkAction(this.play, this.play.getBaby(), Translator.t('scene.bouteille.baby'))
            ];
        }
        else {
            return [
                new MoveAction(this.play, pointer.position.x),
                new DisappearAction(this.play, Bouteille.IDENTIFIER),
                new AddInventoryAction(this.play, BouteilleAlcool.IDENTIFIER),
                new TalkAction(this.play, this.play.getBaby(), Translator.t('scene.bouteille.success'))
            ];
        }
    }

    static get IDENTIFIER()
    {
        return 'bouteille';
    }
}
