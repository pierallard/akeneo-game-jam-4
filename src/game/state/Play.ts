
import {Baby} from "../Baby";
import {Inventory} from "../Inventory";
import {Action} from "../Action";
import {Pickable} from "../Pickable";

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
        this.inventory.create();

        let style = { font: "32px 3dventuremedium", fill: "#ff0044", wordWrap: true, wordWrapWidth: 100, align: "center", backgroundColor: "#ffff00" };
        let text = this.game.add.text(0, 0, 'ALLER', style);

        let minimoi = new Pickable(this, 500, 250, 'baby', 'baby');
        this.game.add.existing(minimoi);
    }

    public update()
    {
        if (this.actions.length) {
            if (this.actions[0].execute() === true) {
                this.actions.shift();
            }
        }
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

    addActions(actions: Array<Action>) {
        if (this.actions.length) {
            return;
        }

        this.actions = this.actions.concat(actions);
    }
}
