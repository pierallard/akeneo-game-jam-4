
import {SceneObject} from "./SceneObject";
import Play from "../state/Play";
import {SimpleGame} from "../../app";

export class Dog extends SceneObject {
    constructor(play: Play) {
        super(play, Dog.IDENTIFIER, 184*SimpleGame.SCALE, 47*SimpleGame.SCALE, 'chien');
    }

    static get IDENTIFIER() {
        return 'dog';
    }

    getLabel(): string {
        return 'Saucisse';
    }

    getStroke(): string {
        return '#eec39a';
    }
}
