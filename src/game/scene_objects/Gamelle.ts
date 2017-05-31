
import {SceneObject} from "./SceneObject";
import Play from "../state/Play";
import {Action} from "../actions/Action";
import {MoveAction} from "../actions/MoveAction";
import {UpdateAction} from "../actions/UpdateAction";
import {Say} from "../actions/Say";
import {RemoveInventoryAction} from "../actions/RemoveInventoryAction";

export class Gamelle extends SceneObject {
    private full: boolean = false;

    constructor(play: Play) {
        super(play, 192*4, 50*4, 'gamelleVide');
    }

    protected use(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        let inventoryObject = this.play_.getInventoryObject();
        if (null !== inventoryObject) {
            if (inventoryObject.getIdentifier() === 'steakLexomil') {
                this.full = true;

                return [
                    new MoveAction(this.play_, pointer.position.x),
                    new RemoveInventoryAction(this.play_, inventoryObject),
                    new UpdateAction(this.play_, this, 'gamellePleine')
                ];
            }
            if (inventoryObject.getIdentifier() === 'icesteak') {
                return [new Say(this.play_, this.play_.getBaby(), "Je suis pas un barbare il va se peter les dents")];
            }
            if (inventoryObject.getIdentifier() === 'steak') {
                return [new Say(this.play_, this.play_.getBaby(), "Je pense qu'il manque l'ingredient du chef")];
            }
        }

        return super.use(origin, pointer);
    }

    protected lookAt(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        if (this.full) {
            return [
                new Say(this.play_, this.play_.getBaby(), "J'ai pas tres envie de gouter, tiens"),
            ];
        } else {
            return [
                new Say(this.play_, this.play_.getBaby(), "Je ferais mieux de donner à manger au chien avant qu'il me mange"),
            ];
        }
    }
}
