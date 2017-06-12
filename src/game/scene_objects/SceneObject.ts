
import {MoveAction} from "../actions/MoveAction";
import Play from "../state/Play";
import {Verb} from "../verbs/Verb";
import {TalkAction} from "../actions/TalkAction";
import {Action} from "../actions/Action";
import {InteractiveObject} from "../InteractiveObject";
import {Translator} from "../translations/Translator";

export class SceneObject extends InteractiveObject
{
    protected shouldDetach: boolean;
    private identifier: string;

    constructor(play: Play, identifier: string, x: number, y: number, key: string)
    {
        super(play);

        this.setSprite(new Phaser.Sprite(play.game, x, y, key));
        this.identifier = identifier;

        this.sprite.inputEnabled = true;
        this.sprite.events.onInputDown.add(this.executeVerb, this);
        this.sprite.events.onInputOver.add(this.mouseOver, this);
        this.sprite.events.onInputOut.add(this.mouseOut, this);
        this.shouldDetach = true;
    }

    getIdentifier():string {
        return this.identifier;
    }

    display() {
        this.sprite.visible = true;
    }

    hide() {
        this.sprite.visible = false;
    }

    private mouseOver() {
        if (null !== this.play.getCursor().getInventoryObject()) {
            this.play.getSentence().setSecondaryObject(this);
        } else {
            this.play.getSentence().setObject(this);
        }
    }

    private mouseOut() {
        if (!this.play.getCursor().getInventoryObject()) {
            this.play.getSentence().setObject(null);
        }
        this.play.getSentence().setSecondaryObject(null);
    }

    private executeVerb(ignore: Phaser.Sprite, pointer: Phaser.Pointer)
    {
        let actions = [];
        if (!this.play.getActionManager().hasAction()) {
            switch (this.play.getCurrentVerb()) {
                case Verb.WALK_TO:
                    actions = this.walkTo(this, pointer);
                    break;

                case Verb.PICK_UP:
                    actions = this.pickUp(this, pointer);
                    break;

                case Verb.USE:
                    actions = this.use(this, pointer);
                    break;

                case Verb.LOOK_AT:
                    actions = this.lookAt(this, pointer);
                    break;
            }

            this.play.getActionManager().addActions(actions);

            if (this.shouldDetach) {
                this.play.getCursor().detach();
            }
        }
    }

    protected walkTo(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        return [
            new MoveAction(this.play, pointer.position.x)
        ];
    }

    protected pickUp(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        let defaultValues = Translator.t('scene.default.no_pick_up');
        return [
            new TalkAction(
                this.play,
                this.play.getBaby(),
                defaultValues[Math.floor(Math.random() * defaultValues.length)]
            )
        ];
    }

    protected use(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        let defaultValues = Translator.t('scene.default.no_use');
        return [
            new TalkAction(
                this.play,
                this.play.getBaby(),
                defaultValues[Math.floor(Math.random() * defaultValues.length)]
            )
        ];
    }

    protected lookAt(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        let defaultValues = Translator.t('scene.default.no_look_at');
        return [
            new TalkAction(
                this.play,
                this.play.getBaby(),
                defaultValues[Math.floor(Math.random() * defaultValues.length)]
            ),
        ];
    }

    toFrench(): string {
        return 'un truc';
    }

    getSprite() {
        return this.sprite;
    }
}
