
import Play from "../state/Play";
import {TalkAction} from "../actions/TalkAction";
import {SceneObject} from "../scene_objects/SceneObject";
import {Action} from "../actions/Action";
import {Translator} from "../translations/Translator";

export class InventoryObject extends SceneObject
{
    private oldPosition: Phaser.Point;
    private active: boolean;

    constructor(play: Play, texture: string) {
        super(play, texture, 0, 0, texture);

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
        return [new TalkAction(this.play, this.play.getBaby(), this.getDescription())];
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

    getLabel(): string {
        return Translator.t('inventory.' + this.getIdentifier() + '.label');
    }

    private getDescription(): string {
        return Translator.t('inventory.' + this.getIdentifier() + '.description');
    }

    setPosition(x: number, y: number) {
        this.sprite.position.setTo(x, y);
    }

    isActive(): boolean {
        return this.active;
    }
}
