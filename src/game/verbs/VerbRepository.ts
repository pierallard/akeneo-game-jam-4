
import {Verb} from "./Verb";
import {SimpleGame} from "../../app";

const PANEL_WIDTH = 400;
const PANEL_HEIGHT= 192;

export class VerbRepository {
    private items: Array<Verb>;
    private currentItem: Verb;
    private game: Phaser.Game;

    constructor(game: Phaser.Game)
    {
        let style = {
            font: "40px 3dventuremedium",
            align: "center",
        };
        this.items = [
            new Verb(this, game, PANEL_WIDTH / 4, SimpleGame.HEIGHT - PANEL_HEIGHT / 4 * 3, 'walk to', style),
            new Verb(this, game, PANEL_WIDTH / 4 * 3, SimpleGame.HEIGHT - PANEL_HEIGHT / 4 * 3, 'look at', style),
            new Verb(this, game, PANEL_WIDTH / 4, SimpleGame.HEIGHT - PANEL_HEIGHT / 4, 'pick up', style),
            new Verb(this, game, PANEL_WIDTH / 4 * 3, SimpleGame.HEIGHT - PANEL_HEIGHT / 4, 'use', style)
        ];

        this.game = game;
        this.setCurrentVerb(this.items[0]);
    }

    public render () {
        this.items.forEach(function (verb) {
            this.game.add.existing(verb);
        }.bind(this));

        this.update();
    }

    private update() {
        this.items.forEach(function (verb, i) {
            let f = verb.style;
            f.fill = (verb === this.currentItem) ? '#639bff' : '#306082';
            verb.setStyle(f);
        }.bind(this));
    }

    public setCurrentVerb(verb: Verb) {
        this.currentItem = verb;

        this.update();
    }

}
