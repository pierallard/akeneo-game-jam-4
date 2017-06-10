
import {Baby} from "../Baby";
import {Inventory} from "../Inventory";
import {VerbRepository} from "../verbs/VerbRepository";
import {MoveAction} from "../actions/MoveAction";
import {Verb} from "../verbs/Verb";
import {InventoryObject} from "../inventory_objects/InventoryObject";
import {Steak} from "../inventory_objects/Steak";
import {Lexomil} from "../inventory_objects/Lexomil";
import {Scene} from "../groups/Scene";
import {Sentence} from "../Sentence";
import {GarageDoor} from "../scene_objects/GarageDoor";
import {BedroomDoor} from "../scene_objects/BedroomDoor";
import {Battery} from "../inventory_objects/Battery";
import {Lamp} from "../inventory_objects/Lamp";
import {BouteilleAlcool} from "../inventory_objects/BouteilleAlcool";
import {ZippoSec} from "../inventory_objects/ZippoSec";
import {Tabac} from "../inventory_objects/Tabac";
import {Cannabis} from "../inventory_objects/Cannabis";
import {TabacBeuh} from "../inventory_objects/TabacBeuh";
import {Feuilles} from "../inventory_objects/Feuilles";
import {Rallonge} from "../inventory_objects/Rallonge";
import {Couteau} from "../inventory_objects/Couteau";
import {ActionManager} from "../actions/ActionManager";
import {Cursor} from "../Cursor";
import {SimpleGame} from "../../app";

export default class Play extends Phaser.State
{
    private baby: Baby;
    private inventory: Inventory;
    private verbRepository: VerbRepository;
    private scene: Scene;
    private cursor: Cursor;
    private sentence: Sentence;
    private actionManager: ActionManager;
    private debug: boolean;

    public constructor()
    {
        super();

        this.inventory = new Inventory(this);
        this.actionManager = new ActionManager(this);
        this.debug = false;
    }

    public create()
    {
        this.scene = new Scene(this);
        this.game.add.existing(this.scene);

        this.inventory.create();

        this.sentence = new Sentence(this.game);

        this.verbRepository = new VerbRepository(this);
        this.verbRepository.render();

        this.scene.createBackground();

        this.addBackground();

        this.scene.createObjects();
        this.createInventoryObjects();

        this.baby = new Baby(this);
        this.scene.addMultiple(this.baby.getSprites());

        this.scene.createObjectSecond();

        this.cursor = new Cursor(this);

        if (this.debug) {
            (<GarageDoor> this.scene.getObject(GarageDoor.IDENTIFIER)).doOpen();
            (<BedroomDoor> this.scene.getObject(BedroomDoor.IDENTIFIER)).doOpen();
        }
    }

    public update()
    {
        this.actionManager.execute();
        this.cursor.update();

    }

    getBaby(): Baby {
        return this.baby;
    }

    getInventory(): Inventory {
        return this.inventory;
    }

    getCurrentVerb(): string {
        return this.verbRepository.getCurrentVerb().getName();
    }

    move(backgroundSprite: Phaser.Sprite, pointer: Phaser.Pointer) {
        if (this.getCurrentVerb() === Verb.WALK_TO) {
            this.actionManager.addAction(new MoveAction(this, pointer.position.x));
        }
    }

    private addBackground() {
        let sprite = this.game.add.sprite(0, 0, 'background', null, this.scene);
        sprite.scale.setTo(SimpleGame.SCALE);
        sprite.inputEnabled = true;
        sprite.events.onInputDown.add(this.move, this);
    }

    private createInventoryObjects() {
        this.inventory.addObject(new InventoryObject(this, 'icesteak', 'le steak surgele', 'Un steak surgele'));
        this.inventory.addObject(new Steak(this));
        this.inventory.addObject(new Lexomil(this));
        this.inventory.addObject(new Battery(this));
        this.inventory.addObject(new Lamp(this));
        this.inventory.addObject(new BouteilleAlcool(this));
        this.inventory.addObject(new ZippoSec(this));
        this.inventory.addObject(new Tabac(this));
        this.inventory.addObject(new Cannabis(this));
        this.inventory.addObject(new TabacBeuh(this));
        this.inventory.addObject(new Feuilles(this));
        this.inventory.addObject(new Rallonge(this));
        this.inventory.addObject(new Couteau(this));

        this.inventory.addObject(new InventoryObject(this, 'bedo', "le bedo", "Y'a plus qu'a allumer!"));
        this.inventory.addObject(new InventoryObject(this, 'steaklexomil', 'le steaknifere', 'Voila qui pourrait endormir un cheval'));
        this.inventory.addObject(new InventoryObject(this, 'engrais', "de l'engrais", '"Garder a portee des enfants". Perdu!'));
        this.inventory.addObject(new InventoryObject(this, 'gode', 'le masseur de visage', "C'est le jouet de papa, ca vibre"));
        this.inventory.addObject(new InventoryObject(this, 'escabeauInventory', "l'escabeau", "Je suis le roi du monde!"));
        this.inventory.addObject(new InventoryObject(this, 'perceuse', 'la perceuse', "Des p'tits trous, des p'tits trous!"));
        this.inventory.addObject(new InventoryObject(this, 'sachet', 'le sachet', "On dirait des graines!"));
        this.inventory.addObject(new InventoryObject(this, 'lampePiles', 'la lampe UV', "J'ai perdu mes deux yeux"));
        this.inventory.addObject(new InventoryObject(this, 'dvdporno', 'le DVD', '"Hairy mature gays"'));
        this.inventory.addObject(new InventoryObject(this, 'zippo', 'le zippo', "Aie!"));
        this.inventory.addObject(new InventoryObject(this, 'rallongecoupee', 'les fils electriques', "Y'a plus qu'a brancher!"));
    }

    public render() {
        if (this.debug) {
            this.game.debug.text('mainGroup.x = ' + this.scene.x, 0, 15);
            this.game.debug.text('action : ' + this.getActionManager().getActions().map(function (action) { return action.debugText(); }).join(', '), 0, 30);
            this.game.debug.text('Inventory : ' + ((null !== this.getCursor().getInventoryObject()) ? this.getCursor().getInventoryObject().getIdentifier() : 'null'), 0, 45);
        }
    }

    getMainGroup(): Scene {
        return this.scene;
    }

    getSentence(): Sentence {
        return this.sentence;
    }

    getVerbRepository(): VerbRepository {
        return this.verbRepository;
    }

    getActionManager(): ActionManager {
        return this.actionManager;
    }

    getCursor(): Cursor {
        return this.cursor;
    }
}
