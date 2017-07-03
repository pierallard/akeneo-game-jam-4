

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
import {Baby} from "../Baby";
import {Verb} from "../verbs/Verb";
import {Translator} from "../translations/Translator";
import {FinalAnim} from "../scene_objects/FinalAnim";

export class Scene {
    private play: Play;
    private clouds: Phaser.TileSprite;
    private objects: Array<SceneObject>;
    private group: Phaser.Group;

    constructor(play: Play) {
        this.play = play;
        this.objects = [];
        this.group = new Phaser.Group(this.play.game, null, 'Main Group');
        this.group.x = MoveAction.getLimitsCenter();
    }

    createWithBaby(baby: Baby) {
        this.play.game.add.existing(this.group);
        this.createClouds();
        let sprite = this.play.game.add.sprite(0, 0, 'background', null, this.group);
        sprite.scale.setTo(SimpleGame.SCALE);
        sprite.inputEnabled = true;
        sprite.events.onInputDown.add(this.move, this);

        this.createObjects();

        this.group.addMultiple(baby.getSprites());
        this.createObjectSecond();
    }

    move(ignore: Phaser.Sprite, pointer: Phaser.Pointer) {
        if (this.play.getVerbRepository().getCurrentVerb().getName() === Verb.WALK_TO) {
            this.play.getActionManager().addAction(new MoveAction(this.play, pointer.position.x));
        }
    }

    update() {
        this.group.update();
        this.clouds.x = (this.clouds.x + 0.2) % (169*SimpleGame.SCALE);
    }

    getPosition() {
        return this.group.position;
    }

    setPositionX(x: number) {
        this.group.x = x;
    }

    private createClouds() {
        this.clouds = new Phaser.TileSprite(this.play.game, 0, 48, 590*SimpleGame.SCALE, 54, 'clouds');
        this.clouds.scale = new Phaser.Point(SimpleGame.SCALE, SimpleGame.SCALE);
        this.group.add(this.clouds);
    }

    private addObject(object: SceneObject) {
        this.group.add(object.getSprite());
        this.objects.push(object);
    }

    private createObjects() {
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
        this.addObject(new OutDoor(this.play))
        this.addObject(new FinalAnim(this.play));

        this.addObject(new PickableObject(this.play, 'lexomil', 380*SimpleGame.SCALE, 55*SimpleGame.SCALE, 'lexomil', 'lexomil'));
        this.addObject(new PickableObject(this.play, 'coldMeat', 295*SimpleGame.SCALE, 45*SimpleGame.SCALE, 'icesteak', 'icesteak', false));
        this.addObject(new PickableObject(this.play, 'engrais', 270*SimpleGame.SCALE, 45*SimpleGame.SCALE, 'engrais', 'engrais', false));
        this.addObject(new PickableObject(this.play, 'feuilles', 45*SimpleGame.SCALE, 47*SimpleGame.SCALE, 'feuilles', 'feuilles'));
        this.addObject(new PickableObject(this.play, 'knife', 234*SimpleGame.SCALE, 26*SimpleGame.SCALE, 'knife', 'knife'));
        this.addObject(new PickableObject(this.play, 'neon', 42*SimpleGame.SCALE, 25*SimpleGame.SCALE, 'neon', 'neon'));
        this.addObject(new PickableObject(this.play, 'gode', 516*SimpleGame.SCALE, 29*SimpleGame.SCALE, 'gode', 'gode'));
        this.addObject(new PickableObject(this.play, 'rallonge', 71*SimpleGame.SCALE, 46*SimpleGame.SCALE, 'rallonge', 'rallonge'));
        this.addObject(new PickableObject(this.play, 'tabac', 570*SimpleGame.SCALE, 50*SimpleGame.SCALE, 'tabac', 'tabac'));
        this.addObject(new PickableObject(this.play, 'escabeau', 5*SimpleGame.SCALE, 50*SimpleGame.SCALE, 'escabeau', 'escabeauInventory'));
        this.addObject(new PickableObject(this.play, 'perceuse', 89*SimpleGame.SCALE, 30*SimpleGame.SCALE, 'perceuse', 'perceuse'));
        this.addObject(new PickableObject(this.play, 'sachet', 395*SimpleGame.SCALE, 51*SimpleGame.SCALE, 'sachet', 'sachet'));
        this.addObject(new PickableObject(this.play, 'potfull', 218*SimpleGame.SCALE, 36*SimpleGame.SCALE, 'potfull', 'cannabis', false));
        this.addObject(new PickableObject(this.play, 'zipposec', 254*SimpleGame.SCALE, 25*SimpleGame.SCALE, 'zipposec', 'zipposec'));
        this.addObject(new PickableObject(this.play, 'dvdporno', 500*SimpleGame.SCALE, 25*SimpleGame.SCALE, 'dvdporno', 'dvdporno'));
    }

    private createObjectSecond() {
        this.addObject(new DVDPlayer(this.play));
        let walls = new Phaser.Sprite(this.play.game, 0, 0, 'backgroundwalls');
        walls.scale.set(SimpleGame.SCALE);
        this.group.add(walls);
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
