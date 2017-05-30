
import {Baby} from "../Baby";
import {Inventory} from "../Inventory";
import {Action} from "../Action";
import {MoveAction} from "../MoveAction";
import {TakeAction} from "../TakeAction";

export default class Play extends Phaser.State
{
    private debug: boolean = false;
    private baby: Baby;
    private inventory: Inventory;
    private actions: Array<Action>;

    public constructor()
    {
        super();

        this.inventory = new Inventory(this);
        this.actions = [];
    }

    public create()
    {
        this.baby = new Baby(this.game, 50, 300, 'baby');
        this.game.add.existing(this.baby);

        let style = { font: "32px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: 100, align: "center", backgroundColor: "#ffff00" };
        let text = this.game.add.text(0, 0, 'ALLER', style);
        text.inputEnabled = true;
        text.events.onInputDown.add(this.listener, this);

        let yolo = this.game.add.sprite(500, 250, 'baby');
        yolo.inputEnabled = true;
        yolo.events.onInputDown.add(this.listener2, this);
    }

    public update()
    {
        if (this.actions.length) {
            if (this.actions[0].execute() === true) {
                this.actions.shift();
            }
        }
    }

    public listener ()
    {
        console.log('YOLO');
    }

    public listener2 (origin: Phaser.Sprite)
    {
        if (this.actions.length > 0) {
            return;
        }

        this.actions.push(
            new MoveAction(this, origin.x)
        );
        this.actions.push(
            new TakeAction(this, origin)
        );
    }

    getBaby() {
        return this.baby;
    }

    removeObject(object: Phaser.Sprite) {
        object.destroy();
    }

    getInventory(): Inventory {
        return this.inventory;
    }
}
