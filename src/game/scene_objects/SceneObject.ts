
import {MoveAction} from "../actions/MoveAction";
import Play from "../state/Play";
import {Verb} from "../verbs/Verb";
import {Say} from "../actions/Say";
import {Action} from "../actions/Action";

export class SceneObject extends Phaser.Sprite
{
    protected play_: Play;
    protected shouldDetach: boolean;
    private identifier: string;

    constructor(play: Play, identifier: string, x: number, y: number, key: string)
    {
        super(play.game, x, y, key);

        this.identifier = identifier;
        this.scale.setTo(4);
        this.inputEnabled = true;
        this.events.onInputDown.add(this.executeVerb, this);
        this.play_ = play;
        this.shouldDetach = true;
    }

    getIdentifier() {
        return this.identifier;
    }

    display() {
        this.visible = true;
    }

    public executeVerb(origin: SceneObject, pointer: Phaser.Pointer)
    {
        if (!this.play_.hasAction()) {
            switch (this.play_.getCurrentVerb()) {
                case Verb.WALK_TO:
                    this.play_.addActions(this.walkTo(origin, pointer));
                    break;

                case Verb.PICK_UP:
                    this.play_.addActions(this.pickUp(origin, pointer));
                    break;

                case Verb.USE:
                    this.play_.addActions(this.use(origin, pointer));
                    break;

                case Verb.LOOK_AT:
                    this.play_.addActions(this.lookAt(origin, pointer));
                    break;
            }

            if (this.shouldDetach) {
                this.play_.detachInventoryObject();
            }
        }
    }

    protected walkTo(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        return [
            new MoveAction(this.play_, pointer.position.x)
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
            new Say(
                this.play_,
                this.play_.getBaby(),
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
            new Say(
                this.play_,
                this.play_.getBaby(),
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
            new Say(
                this.play_,
                this.play_.getBaby(),
                lookAtMessages[Math.floor(Math.random() * lookAtMessages.length)]
            ),
        ];
    }
}
