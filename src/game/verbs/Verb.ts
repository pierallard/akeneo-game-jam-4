
import {VerbRepository} from "./VerbRepository";
export class Verb extends Phaser.Text
{
    private verbRepository: VerbRepository;

    constructor(verbRepository: VerbRepository, game: Phaser.Game, x: number, y: number, text: string, style?: Phaser.PhaserTextStyle)
    {
        super(game, x, y, text, style);

        this.verbRepository = verbRepository;
        this.inputEnabled = true;
        this.events.onInputDown.add(this.setCurrentVerb, this);
        this.anchor.setTo(0.5);
    }

    private setCurrentVerb()
    {
        this.verbRepository.setCurrentVerb(this);
    }
}
