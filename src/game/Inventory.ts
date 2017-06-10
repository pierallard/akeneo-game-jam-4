
import Play from "./state/Play";
import {SimpleGame} from "../app";
import {InventoryObject} from "./inventory_objects/InventoryObject";
import {Steak} from "./inventory_objects/Steak";
import {Lexomil} from "./inventory_objects/Lexomil";
import {Battery} from "./inventory_objects/Battery";
import {Lamp} from "./inventory_objects/Lamp";
import {BouteilleAlcool} from "./inventory_objects/BouteilleAlcool";
import {ZippoSec} from "./inventory_objects/ZippoSec";
import {Tabac} from "./inventory_objects/Tabac";
import {Cannabis} from "./inventory_objects/Cannabis";
import {TabacBeuh} from "./inventory_objects/TabacBeuh";
import {Feuilles} from "./inventory_objects/Feuilles";
import {Rallonge} from "./inventory_objects/Rallonge";
import {Couteau} from "./inventory_objects/Couteau";

const INVENTORY_SIZE: number = (16+8)*4;
const COLUMNS: number = 4;
const LINES: number = 2;

export class Inventory {
    private inventoryGroup: Phaser.Group;
    private items: Array<InventoryObject>;
    private play: Play;
    private table: number;
    private page: number;

    constructor(play: Play)
    {
        this.items = [];
        this.play = play;
        this.table = 0;
        this.page = 0;
    }

    public create() {
        this.inventoryGroup = this.play.game.add.group();

        for (let i = 0; i < COLUMNS * LINES; i++) {
            let position = Inventory.getPosition(i);
            let sprite = new Phaser.Sprite(this.play.game, position.x, position.y, 'inventory');
            sprite.scale.setTo(SimpleGame.SCALE);
            sprite.anchor.setTo(0.5);

            this.play.add.existing(sprite);
            this.inventoryGroup.add(sprite);
        }

        let top = new Phaser.Sprite(this.play.game, SimpleGame.WIDTH - COLUMNS*INVENTORY_SIZE, SimpleGame.HEIGHT - INVENTORY_SIZE, 'arrow_up');
        top.scale.setTo(SimpleGame.SCALE);
        top.anchor.setTo(1,1);
        top.inputEnabled = true;
        top.events.onInputDown.add(this.pageDown, this);

        let bottom = new Phaser.Sprite(this.play.game, SimpleGame.WIDTH - COLUMNS*INVENTORY_SIZE, SimpleGame.HEIGHT - INVENTORY_SIZE, 'arrow_down');
        bottom.scale.setTo(SimpleGame.SCALE);
        bottom.anchor.setTo(1,0);
        bottom.inputEnabled = true;
        bottom.events.onInputDown.add(this.pageUp, this);

        this.play.add.existing(top);
        this.play.add.existing(bottom);

        this.createObjects();
    }

    createObjects() {
        this.addObject(new InventoryObject(this.play, 'icesteak', 'le steak surgele', 'Un steak surgele'));
        this.addObject(new Steak(this.play));
        this.addObject(new Lexomil(this.play));
        this.addObject(new Battery(this.play));
        this.addObject(new Lamp(this.play));
        this.addObject(new BouteilleAlcool(this.play));
        this.addObject(new ZippoSec(this.play));
        this.addObject(new Tabac(this.play));
        this.addObject(new Cannabis(this.play));
        this.addObject(new TabacBeuh(this.play));
        this.addObject(new Feuilles(this.play));
        this.addObject(new Rallonge(this.play));
        this.addObject(new Couteau(this.play));

        this.addObject(new InventoryObject(this.play, 'bedo', "le bedo", "Y'a plus qu'a allumer!"));
        this.addObject(new InventoryObject(this.play, 'steaklexomil', 'le steaknifere', 'Voila qui pourrait endormir un cheval'));
        this.addObject(new InventoryObject(this.play, 'engrais', "de l'engrais", '"Garder a portee des enfants". Perdu!'));
        this.addObject(new InventoryObject(this.play, 'gode', 'le masseur de visage', "C'est le jouet de papa, ca vibre"));
        this.addObject(new InventoryObject(this.play, 'escabeauInventory', "l'escabeau", "Je suis le roi du monde!"));
        this.addObject(new InventoryObject(this.play, 'perceuse', 'la perceuse', "Des p'tits trous, des p'tits trous!"));
        this.addObject(new InventoryObject(this.play, 'sachet', 'le sachet', "On dirait des graines!"));
        this.addObject(new InventoryObject(this.play, 'lampePiles', 'la lampe UV', "J'ai perdu mes deux yeux"));
        this.addObject(new InventoryObject(this.play, 'dvdporno', 'le DVD', '"Hairy mature gays"'));
        this.addObject(new InventoryObject(this.play, 'zippo', 'le zippo', "Aie!"));
        this.addObject(new InventoryObject(this.play, 'rallongecoupee', 'les fils electriques', "Y'a plus qu'a brancher!"));
    }

    pageUp() {
        if (this.page <= 2) {
            this.page++;
            this.update();
        }
    }

    pageDown() {
        if (this.page > 0) {
            this.page--;
            this.update();
        }
    }

    addObject(object: InventoryObject) {
        this.items.push(object);
        this.inventoryGroup.add(object.getSprite());
    }

    activeItem(identifier: string) {
        this.getInventoryObject(identifier).setActive(true);
        this.update();
    }

    removeItem(item: InventoryObject) {
        if (this.play.getCursor().getInventoryObject() === item) {
            this.play.getCursor().detach();
        }
        this.items = this.items.filter(function(obj) {
            return item !== obj
        });
        item.destroy();

        this.update();
    }

    update () {
        let i = 0;
        this.items.forEach(function (item: InventoryObject) {
            if (item.isActive()) {
                if (Math.floor(i / (COLUMNS * LINES)) === this.page) {
                    let position = Inventory.getPosition(i);
                    item.setPosition(position.x, position.y);
                    item.display();
                }
                else {
                    item.hide();
                }
                i++;
            } else {
                item.hide();
            }
        }.bind(this))
    }

    static getPosition(i: number) {
        let x = i % (COLUMNS * LINES) % COLUMNS;
        let y = Math.floor(i % (COLUMNS * LINES) / COLUMNS);

        return new Phaser.Point(
            SimpleGame.WIDTH - COLUMNS * INVENTORY_SIZE + (x + 0.5) * INVENTORY_SIZE,
            SimpleGame.HEIGHT - LINES * INVENTORY_SIZE + (y + 0.5) * INVENTORY_SIZE
        );
    }

    getInventoryObject(identifier: string): InventoryObject {
        for (let i = 0; i < this.items.length; i++) {
            let object = this.items[i];
            if (object.getIdentifier() === identifier) {
                return object;
            }
        }

        return null;
    }
}
