
import {Baby} from "../Baby";
import {Inventory} from "../Inventory";
import {Action} from "../actions/Action";
import {VerbRepository} from "../verbs/VerbRepository";
import {MoveAction} from "../actions/MoveAction";
import {Verb} from "../verbs/Verb";
import {InventoryObject} from "../inventory_objects/InventoryObject";
import {Steak} from "../inventory_objects/Steak";
import {Lexomil} from "../inventory_objects/Lexomil";
import {MainGroup} from "../groups/MainGroup";
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

export default class Play extends Phaser.State
{
    private inventoryObject: InventoryObject;
    private baby: Baby;
    private inventory: Inventory;
    private actions: Array<Action>;
    private verbRepository: VerbRepository;
    private mainGroup: MainGroup;
    public inventoryGroup: Phaser.Group;
    private cursor: Phaser.Sprite;
    private sentence: Sentence;

    public constructor()
    {
        super();

        this.inventory = new Inventory(this);
        this.actions = [];
        this.inventoryObject = null;
    }

    public create()
    {
        this.mainGroup = new MainGroup(this);
        this.game.add.existing(this.mainGroup);

        this.inventoryGroup = this.game.add.group();
        this.inventory.render();

        this.sentence = new Sentence(this.game);

        this.verbRepository = new VerbRepository(this);
        this.verbRepository.render();

        this.mainGroup.createBackground();

        this.addBackground();

        this.mainGroup.createObjects();
        this.createInventoryObjects();

        this.baby = new Baby(this, 1200, 66*4, 'baby');
        this.mainGroup.add(this.baby);

        this.mainGroup.createObjectSecond();

        this.createCursor();

        // (<GarageDoor> this.mainGroup.getObject(GarageDoor.IDENTIFIER)).doOpen();
        // (<BedroomDoor> this.mainGroup.getObject(BedroomDoor.IDENTIFIER)).doOpen();
    }

    public update()
    {
        if (this.actions.length) {
            if (this.actions[0].execute() === true) {
                this.actions.shift();
            }
            if (!this.actions.length) {
                this.verbRepository.setCurrentVerbName(Verb.WALK_TO);
            }
        }

        this.cursor.position.set(
            Math.round(this.game.input.mousePointer.worldX / 4) * 4 + 2,
            Math.round(this.game.input.mousePointer.worldY / 4) * 4 + 2
        );
        if (this.inventoryObject) {
            this.inventoryObject.position.set(
                Math.round(this.game.input.mousePointer.worldX / 4) * 4 + 2,
                Math.round(this.game.input.mousePointer.worldY / 4) * 4 + 2
            );
        }
    }

    getBaby() {
        return this.baby;
    }

    getInventory(): Inventory {
        return this.inventory;
    }

    addActions(actions: Array<Action>) {
        if (this.actions.length) {
            return;
        }

        this.actions = this.actions.concat(actions);
    }

    getCurrentVerb(): string {
        return this.verbRepository.getCurrentVerb().getName();
    }

    move(backgroundSprite: Phaser.Sprite, pointer: Phaser.Pointer) {
        if (this.getCurrentVerb() === Verb.WALK_TO) {
            this.addActions([
                new MoveAction(this, pointer.position.x)
            ]);
        }
    }

    private addBackground() {
        let sprite = this.game.add.sprite(0, 0, 'background', null, this.mainGroup);
        sprite.scale.setTo(4);
        sprite.inputEnabled = true;
        sprite.events.onInputDown.add(this.move, this);
    }

    private createInventoryObjects() {
        this.inventoryGroup.add(new InventoryObject(this, 'icesteak', 'le steak surgele', 'Un steak surgele'));
        this.inventoryGroup.add(new Steak(this));
        this.inventoryGroup.add(new Lexomil(this));
        this.inventoryGroup.add(new Battery(this));
        this.inventoryGroup.add(new Lamp(this));
        this.inventoryGroup.add(new BouteilleAlcool(this));
        this.inventoryGroup.add(new ZippoSec(this));
        this.inventoryGroup.add(new Tabac(this));
        this.inventoryGroup.add(new Cannabis(this));
        this.inventoryGroup.add(new TabacBeuh(this));
        this.inventoryGroup.add(new Feuilles(this));

        this.inventoryGroup.add(new InventoryObject(this, 'bedo', "le bedo", "Y'a plus qu'a allumer!"));
        this.inventoryGroup.add(new InventoryObject(this, 'steaklexomil', 'le steaknifere', 'Voila qui pourrait endormir un cheval'));
        this.inventoryGroup.add(new InventoryObject(this, 'engrais', "de l'engrais", '"Garder a portee des enfants". Perdu!'));
        this.inventoryGroup.add(new InventoryObject(this, 'knife', 'le couteau', "Bien affute, comme je les aime"));
        this.inventoryGroup.add(new InventoryObject(this, 'gode', 'le jouet', "C'est le jouet de papa"));
        this.inventoryGroup.add(new InventoryObject(this, 'rallonge', 'la rallonge', "Beehh c'est une rallonge."));
        this.inventoryGroup.add(new InventoryObject(this, 'escabeauInventory', "l'escabeau", "Je suis le roi du monde!"));
        this.inventoryGroup.add(new InventoryObject(this, 'perceuse', 'la perceuse', "Des p'tits trous, des p'tits trous!"));
        this.inventoryGroup.add(new InventoryObject(this, 'sachet', 'le sachet', "On dirait des graines!"));
        this.inventoryGroup.add(new InventoryObject(this, 'lampePiles', 'la lampe UV', "J'ai perdu mes deux yeux"));
        this.inventoryGroup.add(new InventoryObject(this, 'dvdporno', 'le DVD', '"Hairy mature gays"'));
        this.inventoryGroup.add(new InventoryObject(this, 'zippo', 'le zippo', "Aie!"));
    }

    private createCursor() {
        this.cursor = this.game.add.sprite(0, 0, 'cursor');
        this.cursor.anchor.setTo(0.5);
        this.cursor.scale.setTo(4);
    }

    public render() {
        // this.game.debug.text('mainGroup.x = ' + this.mainGroup.x, 0, 15);
        // this.game.debug.text('action : ' + this.actions.map(function (action) { return action.debugText(); }).join(', '), 0, 30);
        // this.game.debug.text('Inventory : ' + ((null !== this.inventoryObject) ? this.inventoryObject.getIdentifier() : 'null'), 0, 45);
    }

    hasAction() {
        return this.actions.length > 0;
    }

    attachInventoryObject(inventoryObject: InventoryObject) {
        if (null !== this.inventoryObject) {
            this.detachInventoryObject();
        }
        this.verbRepository.setCurrentVerbName(Verb.USE);
        this.inventoryObject = inventoryObject;
        this.sentence.setObject(inventoryObject);
    }

    detachInventoryObject() {
        if (null !== this.inventoryObject) {
            this.inventoryObject.detach();
            this.inventoryObject = null;
            this.verbRepository.setCurrentVerbName(Verb.WALK_TO);
        }
    }

    getInventoryObject() {
        return this.inventoryObject;
    }

    getMainGroup(): MainGroup {
        return this.mainGroup;
    }

    getSentence(): Sentence {
        return this.sentence;
    }
}
