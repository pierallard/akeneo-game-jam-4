

import {SceneObject} from "./SceneObject";
import Play from "../state/Play";
import {Action} from "../actions/Action";
import {MoveAction} from "../actions/MoveAction";
import {RemoveInventoryAction} from "../actions/RemoveInventoryAction";
import {UpdateAction} from "../actions/UpdateAction";
import {AppearAction} from "../actions/AppearAction";
import {DisappearAction} from "../actions/DisappearAction";
import {TalkAction} from "../actions/TalkAction";
import {SimpleGame} from "../../app";

export class Pot extends SceneObject
{
    private graines: boolean;
    private lampe: boolean;
    private engrais: boolean;

    constructor(play: Play) {
        super(play, 'potvide', 218*SimpleGame.SCALE, 36*SimpleGame.SCALE, 'potvide');

        this.graines = false;
        this.lampe = false;
        this.engrais = false;
    }

    protected use(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        let object = this.play.getCursor().getInventoryObject();
        if (null !== object) {
            if (!this.graines) {
                if (object.getIdentifier() === 'sachet') {
                    this.graines = true;

                    return [
                        new MoveAction(this.play, pointer.position.x),
                        new RemoveInventoryAction(this.play, object),
                        new UpdateAction(this.play, this, 'potgraine'),
                    ];
                } else {
                    return [new TalkAction(this.play, this.play.getBaby(), "Il faudrait planter un truc")];
                }
            } else {
                if (object.getIdentifier() === 'lampePiles' || object.getIdentifier() === 'engrais') {
                    let result = [];
                    if (object.getIdentifier() === 'lampePiles') {
                        this.lampe = true;

                        result = result.concat([
                            new MoveAction(this.play, pointer.position.x),
                            new RemoveInventoryAction(this.play, object),
                        ]);

                        if (this.engrais) {
                            return result.concat([
                                new AppearAction(this.play, 'potfull'),
                                new DisappearAction(this.play, this.getIdentifier()),
                            ]);
                        } else {
                            return result.concat([
                                new UpdateAction(this.play, this, 'potpousse'),
                            ])
                        }
                    } else if (object.getIdentifier() === 'engrais') {
                        this.engrais = true;

                        result = result.concat([
                            new MoveAction(this.play, pointer.position.x),
                            new RemoveInventoryAction(this.play, object),

                        ]);

                        if (this.lampe) {
                            return result.concat([
                                new AppearAction(this.play, 'potfull'),
                                new DisappearAction(this.play, this.getIdentifier()),
                            ]);
                        } else {
                            return result.concat([
                                new UpdateAction(this.play, this, 'potpousse'),
                            ])
                        }
                    } else {
                        return [new TalkAction(this.play, this.play.getBaby(), "Tu crois que ca va aider a faire grandir la plante?")]
                    }
                } else {
                    return [new TalkAction(this.play, this.play.getBaby(), "Maintenant, faut la faire grandir!")]
                }
            }
        }

        return super.use(origin, pointer);
    }

    getLabel(): string {
        if (!this.graines) {
            return 'le pot vide';
        } else {
            return 'le pot'
        }
    }
}
