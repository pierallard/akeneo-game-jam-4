

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
import {Chain} from "../scene_objects/Chain";
import {BedroomDoor} from "../scene_objects/BedroomDoor";

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
        this.add(new BedroomDoor(this.play));
        this.add(new Chain(this.play));
        this.add(new PickableObject(this.play, 'lexomil', 'un medicament', 400*4, 55*4, 'lexomil', 'lexomil'));
        this.add(new PickableObject(this.play, 'coldMeat', 'un steak surgele', 275*4, 45*4, 'icesteak', 'icesteak', false));
        this.add(new PickableObject(this.play, 'engrais', 'une bouteille', 255*4, 45*4, 'engrais', 'engrais', false));
        this.add(new PickableObject(this.play, 'feuilles', 'une feuille', 49*4, 53*4, 'feuilles', 'feuilles'));
        this.add(new PickableObject(this.play, 'knife', 'le couteau', 214*4, 26*4, 'knife', 'knife'));
        this.add(new PickableObject(this.play, 'neon', 'une lampe', 50*4, 27*4, 'neon', 'neon'));
        this.add(new PickableObject(this.play, 'gode', 'un jouet', 516*4, 29*4, 'gode', 'gode'));
        this.add(new PickableObject(this.play, 'rallonge', 'une rallonge', 71*4, 46*4, 'rallonge', 'rallonge'));
        this.add(new PickableObject(this.play, 'tabac', 'une clope', 570*4, 59*4, 'tabac', 'tabac'));
        this.add(new PickableObject(this.play, 'escabeau', "l'escabeau", 21*4, 26*4, 'escabeau', 'escabeauInventory'));
        this.add(new PickableObject(this.play, 'perceuse', 'la perceuse', 89*4, 30*4, 'perceuse', 'perceuse'));
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
