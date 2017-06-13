
import {SceneObject} from "./SceneObject";
import Play from "../state/Play";
import {Action} from "../actions/Action";
import {MoveAction} from "../actions/MoveAction";
import {RemoveInventoryAction} from "../actions/RemoveInventoryAction";
import {UpdateAction} from "../actions/UpdateAction";
import {TalkAction} from "../actions/TalkAction";
import {SimpleGame} from "../../app";
import {Translator} from "../translations/Translator";

export class Mother extends SceneObject {
    private zippo: boolean;
    private bedo: boolean;

    constructor(play: Play) {
        super(play, Mother.IDENTIFIER, 323*SimpleGame.SCALE, 66*SimpleGame.SCALE, 'mother');

        this.zippo = false;
        this.bedo = false;
        this.sprite.anchor.setTo(0, 1);
    }

    isDefoncee():boolean {
        return this.zippo && this.bedo;
    }

    static get IDENTIFIER()
    {
        return 'mother';
    }

    protected use(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        let object = this.play.getCursor().getInventoryObject();
        if (null !== object) {
            if (object.getIdentifier() === 'bedo') {
                this.bedo = true;

                let result:Array<Action> = [
                    new MoveAction(this.play, origin.getPosition().x - 800),
                    new RemoveInventoryAction(this.play, object)
                ];

                if (!this.zippo) {
                    result.push(
                        new TalkAction(this.play, this, Translator.t('scene.mother.bedo'))
                    );
                } else {
                    result.push(
                        new TalkAction(this.play, this, Translator.t('scene.mother.success')),
                        new UpdateAction(this.play, this, 'motherdefoncee')
                    );
                }

                return result;
            }
            if (object.getIdentifier() === 'zippo') {
                this.zippo = true;

                let result:Array<Action> = [
                    new MoveAction(this.play, origin.getPosition().x - 800),
                    new RemoveInventoryAction(this.play, object)
                ];

                if (!this.bedo) {
                    result.push(
                        new TalkAction(this.play, this, Translator.t('scene.mother.zippo'))
                    );
                } else {
                    result.push(
                        new TalkAction(this.play, this, Translator.t('scene.mother.success')),
                        new UpdateAction(this.play, this, 'motherdefoncee')
                    );
                }

                return result;
            }
        }

        return super.use(origin, pointer);
    }

    protected lookAt(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        return [new TalkAction(this.play, this.play.getBaby(), Translator.t('scene.mother.description'))];
    }

    getStroke(): string {
        return '#d77bba';
    }
}
