
import {SceneObject} from "./SceneObject";
import Play from "../state/Play";
import {SimpleGame} from "../../app";

export class Father extends SceneObject {
    private busy: boolean;

    constructor(play: Play) {
        super(play, Father.IDENTIFIER, 400*SimpleGame.SCALE, 65*SimpleGame.SCALE, 'father');

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

    getStroke(): string {
        return '#d95763';
    }
}
