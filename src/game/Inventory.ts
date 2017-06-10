
import Play from "./state/Play";
import {SimpleGame} from "../app";
import {InventoryObject} from "./inventory_objects/InventoryObject";

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
