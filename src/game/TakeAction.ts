
import {Action} from "./Action";
import Play from "./state/Play";

export class TakeAction extends Action
{
    private object: Phaser.Sprite;

    constructor(play: Play, object: Phaser.Sprite)
    {
        super(play);

        this.object = object;
    }

    execute(): boolean {
        this.play.removeObject(this.object);
        this.play.getInventory().addItem(this.object);

        return true;
    }
}
