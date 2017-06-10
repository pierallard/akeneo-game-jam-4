
import {Baby} from "../Baby";
import {Inventory} from "../Inventory";
import {VerbRepository} from "../verbs/VerbRepository";
import {MoveAction} from "../actions/MoveAction";
import {Verb} from "../verbs/Verb";
import {Scene} from "../groups/Scene";
import {Sentence} from "../Sentence";
import {GarageDoor} from "../scene_objects/GarageDoor";
import {BedroomDoor} from "../scene_objects/BedroomDoor";
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
        this.verbRepository = new VerbRepository(this);
        this.debug = false;
    }

    public create()
    {
        this.scene = new Scene(this);
        this.game.add.existing(this.scene);
        this.inventory.create();
        this.sentence = new Sentence(this.game);
        this.verbRepository.create();
        this.scene.createBackground();
        this.addBackground();
        this.scene.createObjects();
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
        this.verbRepository.update();
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
