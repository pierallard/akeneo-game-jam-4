
import {SceneObject} from "./SceneObject";
import Play from "../state/Play";
import {Action} from "../actions/Action";
import {MoveAction} from "../actions/MoveAction";
import {UpdateAction} from "../actions/UpdateAction";
import {TalkAction} from "../actions/TalkAction";
import {RemoveInventoryAction} from "../actions/RemoveInventoryAction";
import {GarageDoor} from "./GarageDoor";
import {Steak} from "../inventory_objects/Steak";
import {Dog} from "./Dog";
import Game = Phaser.Game;
import {SimpleGame} from "../../app";

export class Bowl extends SceneObject {
    private full: boolean = false;

    constructor(play: Play) {
        super(play, Bowl.IDENTIFIER, 203*SimpleGame.SCALE, 50*SimpleGame.SCALE, 'gamelleVide');
    }

    protected use(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        let inventoryObject = this.play_.getCursor().getInventoryObject();
        if (null !== inventoryObject) {
            if (inventoryObject.getIdentifier() === 'steaklexomil') {
                this.full = true;
                let porteGarage = <GarageDoor> this.play_.getMainGroup().getObject(GarageDoor.IDENTIFIER);
                porteGarage.doOpen();

                return [
                    new TalkAction(this.play_, this.play_.getMainGroup().getObject(Dog.IDENTIFIER), 'Ouaf!'),
                    new MoveAction(this.play_, origin.position.x - 612),
                    new RemoveInventoryAction(this.play_, inventoryObject),
                    new UpdateAction(this.play_, this, 'gamellePleine'),
                    new MoveAction(this.play_, origin.position.x - 300),
                    new MoveAction(this.play_, origin.position.x - 320),
                    new TalkAction(this.play_, this.play_.getMainGroup().getObject(Dog.IDENTIFIER), 'Ouaf!'),
                    new TalkAction(this.play_, this.play_.getMainGroup().getObject(Dog.IDENTIFIER), 'ouaf ...'),
                    new TalkAction(this.play_, this.play_.getMainGroup().getObject(Dog.IDENTIFIER), '...'),
                    new TalkAction(this.play_, this.play_.getMainGroup().getObject(Dog.IDENTIFIER), 'zzzzzzz'),
                    new UpdateAction(this.play_, this.play_.getMainGroup().getObject(Dog.IDENTIFIER), 'dogsleep'),
                    new TalkAction(this.play_, this.play_.getMainGroup().getObject(Dog.IDENTIFIER), 'zzzzzzzzzzz'),
                    new TalkAction(this.play_, this.play_.getBaby(), 'Hahahaha!')
                ];
            }
            if (inventoryObject.getIdentifier() === 'icesteak') {
                return [new TalkAction(this.play_, this.play_.getBaby(), "Je suis pas un barbare il va se peter les dents")];
            }
            if (inventoryObject.getIdentifier() === Steak.IDENTIFIER) {
                return [new TalkAction(this.play_, this.play_.getBaby(), "Je pense qu'il manque l'ingredient du chef")];
            }
        }

        return super.use(origin, pointer);
    }

    protected lookAt(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        if (this.full) {
            return [
                new TalkAction(this.play_, this.play_.getBaby(), "J'ai pas tres envie de gouter, tiens"),
            ];
        } else {
            return [
                new TalkAction(this.play_, this.play_.getBaby(), "Je devrais donner a manger au chien avant qu'il me mange"),
            ];
        }
    }

    static get IDENTIFIER()
    {
        return 'bowl';
    }

    toFrench(): string {
        return 'la gamelle';
    }
}
