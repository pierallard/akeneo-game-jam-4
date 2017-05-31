
import Play from "../state/Play";
import {Say} from "../actions/Say";
import {SceneObject} from "../scene_objects/SceneObject";
import {Action} from "../actions/Action";

export class InventoryObject extends SceneObject
{
    private identifier: string;
    private oldPosition: Phaser.Point;
    private text: string = null;

    constructor(play: Play, texture: string, text:string = null) {
        super(play, 0, 0, texture);

        this.identifier = texture;
        this.text = text;
        this.play_ = play;
        this.anchor.setTo(0.5);
        this.visible = false;
        this.shouldDetach = false;
    }

    getIdentifier():string {
        return this.identifier;
    }

    protected walkTo(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        this.attach();

        return [];
    }

    protected pickUp(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        return [new Say(this.play_, this.play_.getBaby(), "MAIS JE L'AI DEJA, BANANE")];
    }

    protected use(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        let attachedObject = this.play_.getInventoryObject();
        if (null === attachedObject) {
            this.attach();
            return [];
        }
        else {
            this.play_.detachInventoryObject();
            return this.mixObjects(origin, pointer);
        }
    }

    protected lookAt(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        if (null !== this.text) {
            return [new Say(this.play_, this.play_.getBaby(), this.text)];
        }

        return super.lookAt(origin, pointer);
    }

    private attach()
    {
        this.inputEnabled = false;
        this.oldPosition = new Phaser.Point(this.position.x, this.position.y);
        this.play_.attachInventoryObject(this);
    }

    detach() {
        this.position.setTo(this.oldPosition.x, this.oldPosition.y);
        this.inputEnabled = true;
    }

    protected mixObjects(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        return super.use(origin, pointer);
    }
}
