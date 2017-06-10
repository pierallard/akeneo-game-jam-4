
import Play from "../state/Play";
import {TalkAction} from "../actions/TalkAction";
import {SceneObject} from "../scene_objects/SceneObject";
import {Action} from "../actions/Action";

export class InventoryObject extends SceneObject
{
    private oldPosition: Phaser.Point;
    private text: string = null;
    private french: string = null;
    private active: boolean;

    constructor(play: Play, texture: string, french: string = null, text:string = null) {
        super(play, texture, 0, 0, texture);

        this.french = french;
        this.text = text;
        this.sprite.anchor.setTo(0.5);
        this.active = false;
        this.hide();
        this.shouldDetach = false;
    }

    public setActive(bool: boolean) {
        this.active = bool;
    }

    protected walkTo(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        this.attach();

        return [];
    }

    protected pickUp(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        return [new TalkAction(this.play, this.play.getBaby(), "MAIS JE L'AI DEJA, BANANE")];
    }

    protected use(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        let attachedObject = this.play.getCursor().getInventoryObject();
        if (null === attachedObject) {
            this.attach();
            return [];
        }
        else {
            return this.mixObjects(origin, pointer);
        }
    }

    protected lookAt(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        if (null !== this.text) {
            return [new TalkAction(this.play, this.play.getBaby(), this.text)];
        }

        return super.lookAt(origin, pointer);
    }

    private attach()
    {
        this.sprite.inputEnabled = false;
        this.oldPosition = new Phaser.Point(this.sprite.position.x, this.sprite.position.y);
        this.play.getCursor().attach(this);
    }

    detach() {
        this.sprite.position.setTo(this.oldPosition.x, this.oldPosition.y);
        this.sprite.inputEnabled = true;
    }

    updatePosition(x: number, y: number) {
        this.sprite.position.setTo(x, y);
    }

    protected mixObjects(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        this.play.getCursor().detach();
        return super.use(origin, pointer);
    }

    toFrench(): string {
        if (null !== this.french) {
            return this.french;
        }

        return super.toFrench();
    }

    setPosition(x: number, y: number) {
        this.sprite.position.setTo(x, y);
    }

    isActive(): boolean {
        return this.active;
    }
}
