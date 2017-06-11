
import {MoveAction} from "../actions/MoveAction";
import Play from "../state/Play";
import {Verb} from "../verbs/Verb";
import {TalkAction} from "../actions/TalkAction";
import {Action} from "../actions/Action";
import {InteractiveObject} from "../InteractiveObject";

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

    private executeVerb(origin: Phaser.Sprite, pointer: Phaser.Pointer)
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
        let noPickUpMessages = [
            'Je peux pas prendre ca!',
            "Mmmh... Non, c'est pas une bonne idee.",
            "T'es sur de toi la ?",
            'Haha, mais tu es vraiment debile en fait',
            'Non.',
            'Jamais de la vie Michel'
        ];

        return [
            new TalkAction(
                this.play,
                this.play.getBaby(),
                noPickUpMessages[Math.floor(Math.random() * noPickUpMessages.length)]
            )
        ];
    }

    protected use(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        let noUseMessages = [
            'Je peux pas faire ca!',
            "J'ai aucune idee de ce que tu veux faire.",
            "Arrete de cliquouiller partout la",
            "Oui oui c'est ca oui",
            "Et la marmotte elle met le chocholat dans le papier d'alu"
        ];

        return [
            new TalkAction(
                this.play,
                this.play.getBaby(),
                noUseMessages[Math.floor(Math.random() * noUseMessages.length)]
            )
        ];
    }

    protected lookAt(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        let lookAtMessages = [
            "C'est tres beau, non?",
            "Pas cher chez Amazon",
            "Tu veux me faire regarder toute la maison comme ca?",
            "C'est vraiment tres interessant",
            "Tu me fatigues Michel",
            "Areuh areuh"
        ];

        return [
            new TalkAction(
                this.play,
                this.play.getBaby(),
                lookAtMessages[Math.floor(Math.random() * lookAtMessages.length)]
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
