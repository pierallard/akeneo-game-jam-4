

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
import {Mother} from "../scene_objects/Mother";
import {OutDoor} from "../scene_objects/OutDoor";
import {Prise} from "../scene_objects/Prise";
import {SimpleGame} from "../../app";

export class MainGroup extends Phaser.Group
{
    private play: Play;
    private clouds: Phaser.TileSprite;
    private objects: Array<SceneObject>;

    constructor(play: Play) {
        super(play.game, null, 'Main Group');

        this.play = play;
        this.x = MoveAction.getLimitsCenter();
        this.objects = [];
    }

    update() {
        super.update();

        this.clouds.x = (this.clouds.x + 0.2) % (169*SimpleGame.SCALE);
    }

    createBackground() {
        this.clouds = new Phaser.TileSprite(this.play.game, 0, 48, 590*SimpleGame.SCALE, 54, 'clouds');
        this.clouds.scale = new Phaser.Point(SimpleGame.SCALE, SimpleGame.SCALE);
        this.add(this.clouds);
    }

    addObject(object: SceneObject) {
        this.add(object.getSprite());
        this.objects.push(object);
    }

    createObjects() {
        this.addObject(new Prise(this.play));
        this.addObject(new Fridge(this.play));
        this.addObject(new Cupboard(this.play));
        this.addObject(new Microwave(this.play));
        this.addObject(new Bowl(this.play));
        this.addObject(new GarageDoor(this.play));
        this.addObject(new Dog(this.play));
        this.addObject(new BedroomDoor(this.play));
        this.addObject(new Chain(this.play));
        this.addObject(new Pot(this.play));
        this.addObject(new Four(this.play));
        this.addObject(new Bouteille(this.play));
        this.addObject(new Father(this.play));
        this.addObject(new Mother(this.play));
        this.addObject(new OutDoor(this.play));

        this.addObject(new PickableObject(this.play, 'lexomil', 'un medicament', 380*SimpleGame.SCALE, 55*SimpleGame.SCALE, 'lexomil', 'lexomil'));
        this.addObject(new PickableObject(this.play, 'coldMeat', 'le steak surgele', 295*SimpleGame.SCALE, 45*SimpleGame.SCALE, 'icesteak', 'icesteak', false));
        this.addObject(new PickableObject(this.play, 'engrais', 'la bouteille', 270*SimpleGame.SCALE, 45*SimpleGame.SCALE, 'engrais', 'engrais', false));
        this.addObject(new PickableObject(this.play, 'feuilles', 'les feuilles', 45*SimpleGame.SCALE, 47*SimpleGame.SCALE, 'feuilles', 'feuilles'));
        this.addObject(new PickableObject(this.play, 'knife', 'le couteau', 234*SimpleGame.SCALE, 26*SimpleGame.SCALE, 'knife', 'knife'));
        this.addObject(new PickableObject(this.play, 'neon', 'une lampe', 42*SimpleGame.SCALE, 25*SimpleGame.SCALE, 'neon', 'neon'));
        this.addObject(new PickableObject(this.play, 'gode', 'un jouet', 516*SimpleGame.SCALE, 29*SimpleGame.SCALE, 'gode', 'gode'));
        this.addObject(new PickableObject(this.play, 'rallonge', 'une rallonge', 71*SimpleGame.SCALE, 46*SimpleGame.SCALE, 'rallonge', 'rallonge'));
        this.addObject(new PickableObject(this.play, 'tabac', 'une clope', 570*SimpleGame.SCALE, 50*SimpleGame.SCALE, 'tabac', 'tabac'));
        this.addObject(new PickableObject(this.play, 'escabeau', "l'escabeau", 5*SimpleGame.SCALE, 50*SimpleGame.SCALE, 'escabeau', 'escabeauInventory'));
        this.addObject(new PickableObject(this.play, 'perceuse', 'la perceuse', 89*SimpleGame.SCALE, 30*SimpleGame.SCALE, 'perceuse', 'perceuse'));
        this.addObject(new PickableObject(this.play, 'sachet', 'le sachet de graines', 395*SimpleGame.SCALE, 51*SimpleGame.SCALE, 'sachet', 'sachet'));
        this.addObject(new PickableObject(this.play, 'potfull', 'la tournee de beuh', 218*SimpleGame.SCALE, 36*SimpleGame.SCALE, 'potfull', 'cannabis', false));
        this.addObject(new PickableObject(this.play, 'zipposec', 'le zippo sec', 254*SimpleGame.SCALE, 25*SimpleGame.SCALE, 'zipposec', 'zipposec'));
        this.addObject(new PickableObject(this.play, 'dvdporno', 'le DVD', 500*SimpleGame.SCALE, 25*SimpleGame.SCALE, 'dvdporno', 'dvdporno'));
    }

    createObjectSecond() {
        this.addObject(new DVDPlayer(this.play));
        let walls = new Phaser.Sprite(this.play.game, 0, 0, 'backgroundwalls');
        walls.scale.set(SimpleGame.SCALE);
        this.add(walls);
    }

    public getObject(objectIdentifier: string): SceneObject|null
    {
        for (let i = 0; i < this.objects.length; i++) {
            if (this.objects[i].getIdentifier() === objectIdentifier) {
                return this.objects[i];
            }
        }

        return null;
    }
}
