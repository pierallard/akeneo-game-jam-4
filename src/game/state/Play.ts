
import {Baby} from "../Baby";
import {Inventory} from "../Inventory";
import {Action} from "../actions/Action";
import {Pickable} from "../Pickable";
import {VerbRepository} from "../verbs/VerbRepository";
import {MoveAction} from "../actions/MoveAction";
import {Verb} from "../verbs/Verb";

export default class Play extends Phaser.State
{
    private baby: Baby;
    private inventory: Inventory;
    private actions: Array<Action>;
    private verbRepository: VerbRepository;
    public mainGroup: Phaser.Group;

    public constructor()
    {
        super();

        this.inventory = new Inventory(this);
        this.actions = [];
    }

    public create()
    {
        this.mainGroup = this.game.add.group();
        let limitLeft = 612;
        let sprite = this.game.add.sprite(0, 0, 'background', null, this.mainGroup);

        sprite.scale.setTo(4);
        sprite.inputEnabled = true;
        sprite.events.onInputDown.add(this.move, this);

        this.baby = new Baby(this, 1000, 66*4, 'baby');
        this.mainGroup.add(this.baby);

        this.inventory.render();
        this.verbRepository = new VerbRepository(this.game);
        this.verbRepository.render();

        this.mainGroup.add(new Pickable(this, 1000, 200, 'cannabis', 'cannabis'));
        this.mainGroup.add(new Pickable(this, 1500, 200, 'zippo', 'zippo'));
        this.mainGroup.add(new Pickable(this, 1300, 200, 'piles', 'piles'));
        this.mainGroup.add(new Pickable(this, 1200, 200, 'knife', 'knife'));

        this.mainGroup.x = -limitLeft;
    }

    public update()
    {
        if (this.actions.length) {
            if (this.actions[0].execute() === true) {
                this.actions.shift();
            }
        }
    }

    public render() {
        this.game.debug.text('mainGroup.x = ' + this.mainGroup.x, 0, 15);
        this.game.debug.text('action : ' + this.actions.map(function (action) { return action.debugText(); }).join(', '), 0, 30);
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

    getCurrentVerb(): string {
        return this.verbRepository.getCurrentVerb().getName();
    }

    setVerb(verb: string) {
        this.verbRepository.setCurrentVerbName(verb);
    }

    move(backgroundSprite: Phaser.Sprite, pointer: Phaser.Pointer) {
        if (this.getCurrentVerb() === Verb.WALK_TO) {
            this.addActions([
                new MoveAction(this, pointer.position.x)
            ]);
        }
    }
}
