

import {MoveAction} from "./MoveAction";
import {TakeAction} from "./TakeAction";
import Play from "./state/Play";

export class Pickable extends Phaser.Sprite
{
    private play_: Play;
    private pickedImage: string;

    constructor(play: Play, x: number, y: number, key: string, pickedImage: string)
    {
        super(play.game, x, y, key);

        this.inputEnabled = true;
        this.events.onInputDown.add(this.addActions, this);
        this.play_ = play;
        this.pickedImage = pickedImage;
    }

    public addActions(origin: Pickable)
    {
        this.play_.addActions([
            new MoveAction(this.play_, origin.x),
            new TakeAction(this.play_, origin)
        ]);
    }

    public getInventoryImage(): string {
        return this.pickedImage;
    }
}
