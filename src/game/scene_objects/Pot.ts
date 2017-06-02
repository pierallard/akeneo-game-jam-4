

import {SceneObject} from "./SceneObject";
import Play from "../state/Play";
import {Action} from "../actions/Action";
import {MoveAction} from "../actions/MoveAction";
import {RemoveInventoryAction} from "../actions/RemoveInventoryAction";
import {UpdateAction} from "../actions/UpdateAction";
import {AppearAction} from "../actions/AppearAction";
import {DisappearAction} from "../actions/DisappearAction";

const STATE_EMPTY = 1;
const STATE_GRAINES = 2;
const STATE_POUSSE = 3;

export class Pot extends SceneObject
{
    private state: number;

    constructor(play: Play) {
        super(play, 'potvide', 218*4, 36*4, 'potvide');

        this.state = STATE_EMPTY;
    }

    protected use(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        let object = this.play_.getInventoryObject();
        if (null !== object) {
            if (this.state === STATE_EMPTY && object.getIdentifier() === 'sachet') {
                this.state = STATE_GRAINES;

                return [
                    new MoveAction(this.play_, pointer.position.x),
                    new RemoveInventoryAction(this.play_, object),
                    new UpdateAction(this.play_, this, 'potgraine'),
                ];
            }
            if (this.state === STATE_GRAINES && object.getIdentifier() === 'lampePiles') {
                this.state = STATE_POUSSE;

                return [
                    new MoveAction(this.play_, pointer.position.x),
                    new RemoveInventoryAction(this.play_, object),
                    new UpdateAction(this.play_, this, 'potpousse'),
                ];
            }
            if (this.state === STATE_POUSSE && object.getIdentifier() === 'engrais') {
                return [
                    new MoveAction(this.play_, pointer.position.x),
                    new RemoveInventoryAction(this.play_, object),
                    new AppearAction(this.play_, 'potfull'),
                    new DisappearAction(this.play_, this.getIdentifier()),
                ]
            }
        }

        return super.use(origin, pointer);
    }

    toFrench(): string {
        switch(this.state) {
            case STATE_EMPTY: return 'le pot';
            case STATE_GRAINES: return 'le pot plein';
            case STATE_POUSSE: return 'le pot eclaire';
        }

        return super.toFrench();
    }
}
