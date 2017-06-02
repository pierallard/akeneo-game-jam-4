
import {SceneObject} from "./SceneObject";
import Play from "../state/Play";
import {Action} from "../actions/Action";
import {TalkAction} from "../actions/TalkAction";
import {MoveAction} from "../actions/MoveAction";
import {UpdateAction} from "../actions/UpdateAction";
import {Father} from "./Father";
import {Mother} from "./Mother";

export class OutDoor extends SceneObject {
    private open: boolean = false;

    constructor(play: Play) {
        super(play, OutDoor.IDENTIFIER, 352*4, 16*4, 'porteSortie');
    }

    toFrench(): string {
        return 'la sortie';
    }

    protected use(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        let object = this.play_.getInventoryObject();
        if (null !== object && object.getIdentifier() === 'perceuse') {
            let mother = <Mother> this.play_.getMainGroup().getObject(Mother.IDENTIFIER);
            if (mother.isDefoncee()) {
                this.doOpen();

                return [
                    new MoveAction(this.play_, pointer.position.x),
                    new UpdateAction(this.play_, this, 'porteSortieOpen')
                ];
            }
            else {
                return [
                    new TalkAction(this.play_, mother, "Kevin, arrete d'embeter maman!")
                ]
            }
        }

        if (!this.open) {
            return [
                new MoveAction(this.play_, pointer.position.x),
                new TalkAction(this.play_, this.play_.getBaby(), "C'est bloque")
            ];
        }

        return super.use(origin, pointer);
    }

    protected walkTo(origin: SceneObject, pointer: Phaser.Pointer): Array<Action> {
        if (!this.open) {
            return super.walkTo(origin, pointer)
        }
        return [
            new MoveAction(this.play_, pointer.position.x),
            new TalkAction(this.play_, this.play_.getBaby(), "Yeeeeha!"),
            new TalkAction(this.play_, this.play_.getMainGroup().getObject(Father.IDENTIFIER), "Reviens ici, fils de pute!"),
            new TalkAction(this.play_, this.play_.getMainGroup().getObject(Mother.IDENTIFIER), "MMm.. Kevin arrete tes conneriiiiies....")
        ];
    }

    public doOpen() {
        this.open = true;
    }

    static get IDENTIFIER()
    {
        return 'porteSortie';
    }
}
