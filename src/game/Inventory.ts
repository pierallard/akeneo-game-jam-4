
import Play from "./state/Play";
import {SimpleGame} from "../app";

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
        }
    }

    addItem(image: string) {
        let position = this.getPosition(this.items.length);
        let sprite = new Phaser.Sprite(this.play.game, position.x, position.y, image);
        sprite.scale.setTo(2);
        sprite.anchor.setTo(0.5);

        this.play.add.existing(sprite);
        this.items.push(sprite);
    }

    getPosition(i: number) {
        let x = i % (COLUMNS * LINES) % COLUMNS;
        let y = Math.floor(i % (COLUMNS * LINES) / COLUMNS);

        return new Phaser.Point(
            SimpleGame.WIDTH - COLUMNS * INVENTORY_SIZE + (x + 0.5) * INVENTORY_SIZE,
            SimpleGame.HEIGHT - LINES * INVENTORY_SIZE + (y + 0.5) * INVENTORY_SIZE
        );
    }
}
