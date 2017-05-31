

import {MoveAction} from "../actions/MoveAction";
import {Fridge} from "../scene_objects/Fridge";
import {Cupboard} from "../scene_objects/Cupboard";
import {Microwave} from "../scene_objects/Microwave";
import {Bowl} from "../scene_objects/Bowl";
import {GarageDoor} from "../scene_objects/GarageDoor";
import {Dog} from "../scene_objects/Dog";
import {PickableObject} from "../scene_objects/PickableObject";
import Play from "../state/Play";
import {SceneObject} from "../scene_objects/SceneObject";
export class MainGroup extends Phaser.Group
{
    private play: Play;

    constructor(play: Play) {
        super(play.game, null, 'Main Group');

        this.play = play;
        this.x = MoveAction.getLimitsCenter();
    }

    createObjects() {
        this.add(new Fridge(this.play));
        this.add(new Cupboard(this.play));
        this.add(new Microwave(this.play));
        this.add(new Bowl(this.play));
        this.add(new GarageDoor(this.play));
        this.add(new Dog(this.play));
        this.add(new PickableObject(this.play, 'lexomil', 400*4, 60*4, 'lexomil', 'lexomil'));
        this.add(new PickableObject(this.play, 'coldMeat', 275*4, 45*4, 'icesteak', 'icesteak', false));
        this.add(new PickableObject(this.play, 'engrais', 255*4, 45*4, 'engrais', 'engrais', false));
    }

    public getObject(objectIdentifier: string): SceneObject|null
    {
        for (let i = 0; i < this.children.length; i++) {
            if (typeof this.children[i]['getIdentifier'] == 'function') {
                let object = <SceneObject> this.children[i];
                if (object.getIdentifier() === objectIdentifier) {
                    return object;
                }
            }
        }

        return null;
    }
}
