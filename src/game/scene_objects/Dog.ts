
import {SceneObject} from "./SceneObject";
import Play from "../state/Play";

export class Dog extends SceneObject {
    constructor(play: Play) {
        super(play, Dog.IDENTIFIER, 171*4, 41*4, 'chien');
    }

    static get IDENTIFIER() {
        return 'dog';
    }
}
