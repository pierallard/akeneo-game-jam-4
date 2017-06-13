
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
import {Translator} from "../translations/Translator";

export class Bowl extends SceneObject {
    private full: boolean = false;

    constructor(play: Play) {
        super(play, Bowl.IDENTIFIER, 203*SimpleGame.SCALE, 50*SimpleGame.SCALE, 'gamelleVide');
    }

    protected use(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        let inventoryObject = this.play.getCursor().getInventoryObject();
        if (null !== inventoryObject) {
            if (inventoryObject.getIdentifier() === 'steaklexomil') {
                this.full = true;
                let porteGarage = <GarageDoor> this.play.getScene().getObject(GarageDoor.IDENTIFIER);
                porteGarage.doOpen();

                return [
                    new TalkAction(this.play, this.play.getScene().getObject(Dog.IDENTIFIER), Translator.t('scene.bowl.dog1')),
                    new MoveAction(this.play, origin.getPosition().x - 612),
                    new RemoveInventoryAction(this.play, inventoryObject),
                    new UpdateAction(this.play, this, 'gamellePleine'),
                    new MoveAction(this.play, origin.getPosition().x - 300),
                    new MoveAction(this.play, origin.getPosition().x - 320),
                    new TalkAction(this.play, this.play.getScene().getObject(Dog.IDENTIFIER), Translator.t('scene.bowl.dog1')),
                    new TalkAction(this.play, this.play.getScene().getObject(Dog.IDENTIFIER), Translator.t('scene.bowl.dog2')),
                    new TalkAction(this.play, this.play.getScene().getObject(Dog.IDENTIFIER), Translator.t('scene.bowl.dog3')),
                    new TalkAction(this.play, this.play.getScene().getObject(Dog.IDENTIFIER), Translator.t('scene.bowl.dog4')),
                    new UpdateAction(this.play, this.play.getScene().getObject(Dog.IDENTIFIER), 'dogsleep'),
                    new TalkAction(this.play, this.play.getScene().getObject(Dog.IDENTIFIER), Translator.t('scene.bowl.dog5')),
                    new TalkAction(this.play, this.play.getBaby(), Translator.t('scene.bowl.success'))
                ];
            }
            if (inventoryObject.getIdentifier() === 'icesteak') {
                return [new TalkAction(this.play, this.play.getBaby(), Translator.t('scene.bowl.use_icesteak'))];
            }
            if (inventoryObject.getIdentifier() === Steak.IDENTIFIER) {
                return [new TalkAction(this.play, this.play.getBaby(), Translator.t('scene.bowl.use_steak'))];
            }
        }

        return super.use(origin, pointer);
    }

    protected lookAt(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        if (this.full) {
            return [
                new TalkAction(this.play, this.play.getBaby(), Translator.t('scene.bowl.look_full')),
            ];
        } else {
            return [
                new TalkAction(this.play, this.play.getBaby(), Translator.t('scene.bowl.look_empty')),
            ];
        }
    }

    static get IDENTIFIER()
    {
        return 'bowl';
    }
}
