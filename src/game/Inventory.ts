
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
    private page: number;

    constructor(play: Play)
    {
        this.items = [];
        this.play = play;
        this.table = 0;
        this.page = 0;
    }

    render() {
        for (let i = 0; i < COLUMNS * LINES; i++) {
            let position = this.getPosition(i);
            let sprite = new Phaser.Sprite(this.play.game, position.x, position.y, 'inventory');
            sprite.scale.setTo(SimpleGame.SCALE);
            sprite.anchor.setTo(0.5);

            this.play.add.existing(sprite);
            this.play.getInventoryGroup().add(sprite);
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

    addItem(identifier: string) {
        let position = this.getPosition(this.items.length);
        let sprite = this.getSprite(identifier);
        if (undefined === sprite) {
            console.log('No sprite "' + identifier + '" found !');
        }
        sprite.visible = true;
        sprite.position.setTo(position.x, position.y);
        this.items.push(sprite);
        this.page = Math.floor((this.items.length - 1) / (COLUMNS * LINES));
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
        this.items.forEach(function (item, i) {
            if (Math.floor(i / (COLUMNS * LINES)) === this.page) {
                let position = this.getPosition(i);
                item.position.setTo(position.x, position.y);
                item.visible = true;
            }
            else {
                item.visible = false;
            }
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
        for (let i = 0; i< this.play.getInventoryGroup().children.length; i++) {
            if (typeof this.play.getInventoryGroup().children[i]['getIdentifier'] == 'function') {
                let object = <InventoryObject> this.play.getInventoryGroup().children[i];
                if (object.getIdentifier() === identifier) {
                    return object;
                }
            }
        }
    }
}
