

import {MoveAction} from "./actions/MoveAction";
import {TakeAction} from "./actions/TakeAction";
import Play from "./state/Play";
import {Verb} from "./verbs/Verb";
import {ChangeVerbAction} from "./actions/ChangeVerbAction";
import {Say} from "./actions/Say";

export class Pickable extends Phaser.Sprite
{
    private play_: Play;
    private pickedImage: string;

    constructor(play: Play, x: number, y: number, key: string, pickedImage: string)
    {
        super(play.game, x, y, key);

        this.scale.setTo(4);
        this.inputEnabled = true;
        this.events.onInputDown.add(this.executeVerb, this);
        this.play_ = play;
        this.pickedImage = pickedImage;
    }

    public executeVerb(origin: Pickable, pointer: Phaser.Pointer)
    {
        switch(this.play_.getCurrentVerb()) {
            case Verb.WALK_TO:
                this.walkTo(origin, pointer);
                break;

            case Verb.PICK_UP:
                this.pickUp(origin, pointer);
                break;

            case Verb.USE:
                this.use(origin, pointer);
                break;

            case Verb.LOOK_AT:
                this.lookAt(origin, pointer);
                break;
        }
    }

    public getInventoryImage(): string {
        return this.pickedImage;
    }

    private walkTo(origin: Pickable, pointer: Phaser.Pointer) {
        this.play_.addActions([
            new MoveAction(this.play_, pointer.position.x),
            new ChangeVerbAction(this.play_, Verb.WALK_TO)
        ]);
    }

    private pickUp(origin: Pickable, pointer: Phaser.Pointer) {
        this.play_.addActions([
            new MoveAction(this.play_, pointer.position.x),
            new TakeAction(this.play_, origin),
            new ChangeVerbAction(this.play_, Verb.WALK_TO)
        ]);
    }

    private use(origin: Pickable, pointer: Phaser.Pointer) {
        this.play_.addActions([
            new ChangeVerbAction(this.play_, Verb.WALK_TO)
        ]);
    }

    private lookAt(origin: Pickable, pointer: Phaser.Pointer) {
        this.play_.addActions([
            new Say(this.play_, this.play_.getBaby(), "C'est un couteau"),
            new ChangeVerbAction(this.play_, Verb.WALK_TO)
        ]);
    }
}
