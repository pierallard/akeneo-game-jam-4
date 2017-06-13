

import {MoveAction} from "../actions/MoveAction";
import {TakeAction} from "../actions/TakeAction";
import Play from "../state/Play";
import {SceneObject} from "./SceneObject";
import {Action} from "../actions/Action";

export class PickableObject extends SceneObject
{
    private generatedObjectIdentifier: string;

    constructor(play: Play, identifier: string, x: number, y: number, key: string, generatedObjectIdentifier: string, display: boolean = true)
    {
        super(play, identifier, x, y, key);

        this.generatedObjectIdentifier = generatedObjectIdentifier;
        if (!display) {
            this.hide();
        }
    }

    public getGeneratedObjectIdentifier(): string {
        return this.generatedObjectIdentifier;
    }

    protected pickUp(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        return [
            new MoveAction(this.play, pointer.position.x),
            new TakeAction(this.play, <PickableObject> origin),
        ];
    }
}
