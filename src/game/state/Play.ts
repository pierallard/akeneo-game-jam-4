
import {Baby} from "../Baby";
import {Inventory} from "../Inventory";
import {Action} from "../actions/Action";
import {Pickable} from "../Pickable";
import {VerbRepository} from "../verbs/VerbRepository";

export default class Play extends Phaser.State
{
    private baby: Baby;
    private inventory: Inventory;
    private actions: Array<Action>;
    private verbRepository: VerbRepository;

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
        this.inventory.render();
        this.verbRepository = new VerbRepository(this.game);
        this.verbRepository.render();

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
