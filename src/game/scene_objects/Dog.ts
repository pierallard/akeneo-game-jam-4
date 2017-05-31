
import {SceneObject} from "./SceneObject";
import Play from "../state/Play";

export class Dog extends SceneObject {
    constructor(play: Play) {
        super(play, 'dog', 171*4, 41*4, 'chien');
    }
}
