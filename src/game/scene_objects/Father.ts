
import {SceneObject} from "./SceneObject";
import Play from "../state/Play";

export class Father extends SceneObject {
    private busy: boolean;

    constructor(play: Play) {
        super(play, Father.IDENTIFIER, 400*4, 65*4, 'father');

        this.busy = false;
        this.anchor.setTo(0, 1);
    }

    toFrench(): string {
        return 'papa';
    }

    setBusy() {
        this.busy = true;
        this.loadTexture('fatherBusy');
    }

    static get IDENTIFIER()
    {
        return 'father';
    }

    isBusy():boolean {
        return this.busy;
    }
}
