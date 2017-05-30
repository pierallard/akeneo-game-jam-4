
import Play from "./state/Play";

export class Inventory {
    private items: Array<Phaser.Sprite>;
    private play: Play;

    constructor(play: Play)
    {
        this.items = [];

        this.play = play;
    }

    addItem(item: Phaser.Sprite) {
        this.items.push(item);

        let sprite = new Phaser.Sprite(this.play.game, 800, 300, 'baby');
        let yolo = this.play.game.add.existing(sprite);
    }

    update()
    {

    }
}
