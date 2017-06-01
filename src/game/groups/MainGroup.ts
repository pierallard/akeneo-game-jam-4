

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
import {Pot} from "../scene_objects/Pot";
import {Four} from "../scene_objects/Four";
import {Bouteille} from "../scene_objects/Bouteille";
import {DVDPlayer} from "../scene_objects/DVDPlayer";
import {Father} from "../scene_objects/Father";

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
        this.add(new Pot(this.play));
        this.add(new Four(this.play));
        this.add(new Bouteille(this.play));
        this.add(new DVDPlayer(this.play));
        this.add(new Father(this.play));
        this.add(new PickableObject(this.play, 'lexomil', 'un medicament', 400*4, 55*4, 'lexomil', 'lexomil'));
        this.add(new PickableObject(this.play, 'coldMeat', 'le steak surgele', 295*4, 45*4, 'icesteak', 'icesteak', false));
        this.add(new PickableObject(this.play, 'engrais', 'la bouteille', 270*4, 45*4, 'engrais', 'engrais', false));
        this.add(new PickableObject(this.play, 'feuilles', 'les feuilles', 45*4, 47*4, 'feuilles', 'feuilles'));
        this.add(new PickableObject(this.play, 'knife', 'le couteau', 234*4, 26*4, 'knife', 'knife'));
        this.add(new PickableObject(this.play, 'neon', 'une lampe', 42*4, 25*4, 'neon', 'neon'));
        this.add(new PickableObject(this.play, 'gode', 'un jouet', 516*4, 29*4, 'gode', 'gode'));
        this.add(new PickableObject(this.play, 'rallonge', 'une rallonge', 71*4, 46*4, 'rallonge', 'rallonge'));
        this.add(new PickableObject(this.play, 'tabac', 'une clope', 570*4, 50*4, 'tabac', 'tabac'));
        this.add(new PickableObject(this.play, 'escabeau', "l'escabeau", 21*4, 26*4, 'escabeau', 'escabeauInventory'));
        this.add(new PickableObject(this.play, 'perceuse', 'la perceuse', 89*4, 30*4, 'perceuse', 'perceuse'));
        this.add(new PickableObject(this.play, 'sachet', 'le sachet', 425*4, 51*4, 'sachet', 'sachet'));
        this.add(new PickableObject(this.play, 'potfull', 'la tournee de beuh', 218*4, 36*4, 'potfull', 'cannabis', false));
        this.add(new PickableObject(this.play, 'zipposec', 'le briquet', 254*4, 25*4, 'zipposec', 'zipposec'));
        this.add(new PickableObject(this.play, 'dvdporno', 'le DVD', 500*4, 25*4, 'dvdporno', 'dvdporno'));
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
