
import Play from "./state/Play";
import {SimpleGame} from "../app";
import {InventoryObject} from "./inventory_objects/InventoryObject";

const INVENTORY_SIZE: number = (16+8)*4;
const COLUMNS: number = 4;
const LINES: number = 2;

export class Inventory {
    private items: Array<Phaser.Sprite>;
    private play: Play;
    private table: number;

    constructor(play: Play)
    {
        this.items = [];
        this.play = play;
        this.table = 0;
    }

    render() {
        for (let i = 0; i < COLUMNS * LINES; i++) {
            let position = this.getPosition(i);
            let sprite = new Phaser.Sprite(this.play.game, position.x, position.y, 'inventory');
            sprite.scale.setTo(4);
            sprite.anchor.setTo(0.5);

            this.play.add.existing(sprite);
            this.play.inventoryGroup.add(sprite);
        }
    }

    addItem(identifier: string) {
        let position = this.getPosition(this.items.length);
        let sprite = this.getSprite(identifier);
        if (undefined === sprite) {
            console.log('No sprite "' + identifier + '" found !');
        }
        sprite.visible = true;
        sprite.position.setTo(position.x, position.y);
        this.items.push(sprite);
    }

    removeItem(item: InventoryObject) {
        if (this.play.getInventoryObject() === item) {
            this.play.detachInventoryObject();
        }
        this.items = this.items.filter(function(obj) {
            return item !== obj
        });
        item.destroy();

        this.update();
    }

    update () {
        this.items.forEach(function (item, i) {
            let position = this.getPosition(i);
            item.position.setTo(position.x, position.y);
        }.bind(this))
    }

    getPosition(i: number) {
        let x = i % (COLUMNS * LINES) % COLUMNS;
        let y = Math.floor(i % (COLUMNS * LINES) / COLUMNS);

        return new Phaser.Point(
            SimpleGame.WIDTH - COLUMNS * INVENTORY_SIZE + (x + 0.5) * INVENTORY_SIZE,
            SimpleGame.HEIGHT - LINES * INVENTORY_SIZE + (y + 0.5) * INVENTORY_SIZE
        );
    }

    getSprite(identifier: string): InventoryObject {
        for (let i = 0; i< this.play.inventoryGroup.children.length; i++) {
            if (typeof this.play.inventoryGroup.children[i]['getIdentifier'] == 'function') {
                let object = <InventoryObject> this.play.inventoryGroup.children[i];
                if (object.getIdentifier() === identifier) {
                    return object;
                }
            }
        }
    }
}
