
import {SceneObject} from "./SceneObject";
import Play from "../state/Play";
import {Action} from "../actions/Action";
import {MoveAction} from "../actions/MoveAction";
import {RemoveInventoryAction} from "../actions/RemoveInventoryAction";
import {UpdateAction} from "../actions/UpdateAction";
import {TalkAction} from "../actions/TalkAction";

export class Mother extends SceneObject {
    private zippo: boolean;
    private bedo: boolean;

    constructor(play: Play) {
        super(play, Mother.IDENTIFIER, 323*4, 66*4, 'mother');

        this.zippo = false;
        this.bedo = false;
        this.anchor.setTo(0, 1);
    }

    isDefoncee():boolean {
        return this.zippo && this.bedo;
    }

    toFrench(): string {
        return 'maman';
    }

    static get IDENTIFIER()
    {
        return 'mother';
    }

    protected use(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        let object = this.play_.getInventoryObject();
        if (null !== object) {
            if (object.getIdentifier() === 'bedo') {
                this.bedo = true;

                let result:Array<Action> = [
                    new MoveAction(this.play_, origin.position.x - 800),
                    new RemoveInventoryAction(this.play_, object)
                ];

                if (!this.zippo) {
                    result.push(
                        new TalkAction(this.play_, this, "Tiens, je me rappelle pas avoir mis ca la... Ou est mon feu?")
                    );
                } else {
                    result.push(
                        new TalkAction(this.play_, this, "Oh, putain, je suis defoncee..."),
                        new UpdateAction(this.play_, this, 'motherdefoncee')
                    );
                }

                return result;
            }
            if (object.getIdentifier() === 'zippo') {
                this.zippo = true;

                let result:Array<Action> = [
                    new MoveAction(this.play_, origin.position.x - 800),
                    new RemoveInventoryAction(this.play_, object)
                ];

                if (!this.bedo) {
                    result.push(
                        new TalkAction(this.play_, this, "Du feu, du feu... Mais pour allumer quoi?")
                    );
                } else {
                    result.push(
                        new TalkAction(this.play_, this, "Oh, putain, je suis defoncee..."),
                        new UpdateAction(this.play_, this, 'motherdefoncee')
                    );
                }

                return result;
            }
        }

        return super.use(origin, pointer);
    }

    protected lookAt(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        return [new TalkAction(this.play_, this.play_.getBaby(), "Chatroulette, sans doute un site avec des chats")];
    }
}
