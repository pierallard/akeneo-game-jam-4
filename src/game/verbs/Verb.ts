
import {VerbRepository} from "./VerbRepository";

const WALK_TO = 'walk to';
const LOOK_AT = 'look at';
const PICK_UP = 'pick up';
const USE = 'use';

export class Verb extends Phaser.Text
{
    private verbRepository: VerbRepository;
    private name_: string;

    constructor(verbRepository: VerbRepository, game: Phaser.Game, x: number, y: number, name: string, text: string, style?: Phaser.PhaserTextStyle)
    {
        super(game, x, y, text, style);

        this.name_ = name;
        this.verbRepository = verbRepository;
        this.inputEnabled = true;
        this.events.onInputDown.add(this.setCurrentVerb, this);
        this.anchor.setTo(0.5);
    }

    private setCurrentVerb()
    {
        this.verbRepository.setCurrentVerb(this);
    }

    public getName(): string
    {
        return this.name_;
    }

    static get WALK_TO(): string {
        return WALK_TO;
    }

    static get LOOK_AT(): string {
        return LOOK_AT;
    }

    static get PICK_UP(): string {
        return PICK_UP;
    }

    static get USE(): string {
        return USE;
    }

    public toFrench(): string {
        return this.text;
    }
}
