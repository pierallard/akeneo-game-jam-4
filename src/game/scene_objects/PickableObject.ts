

import {MoveAction} from "../actions/MoveAction";
import {TakeAction} from "../actions/TakeAction";
import Play from "../state/Play";
import {SceneObject} from "./SceneObject";
import {Action} from "../actions/Action";

export class PickableObject extends SceneObject
{
    private generatedObjectIdentifier: string;
    private french: string;

    constructor(play: Play, identifier, french: string, x: number, y: number, key: string, generatedObjectIdentifier: string, display: boolean = true)
    {
        super(play, identifier, x, y, key);

        this.french = french;
        this.scale.setTo(4);
        this.inputEnabled = true;
        this.generatedObjectIdentifier = generatedObjectIdentifier;
        this.visible = display;
    }

    public getGeneratedObjectIdentifier(): string {
        return this.generatedObjectIdentifier;
    }

    protected pickUp(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        return [
            new MoveAction(this.play_, pointer.position.x),
            new TakeAction(this.play_, <PickableObject> origin),
        ];
    }

    toFrench(): string {
        return this.french;
    }
}
