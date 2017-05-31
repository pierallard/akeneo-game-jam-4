
import {Verb} from "./Verb";
import {SimpleGame} from "../../app";
import Play from "../state/Play";

const PANEL_WIDTH = 400;
const PANEL_HEIGHT= 128;

export class VerbRepository {
    private items: Array<Verb>;
    private currentItem: Verb;
    private play: Play;

    constructor(play: Play)
    {
        let style = {
            font: "40px 3dventuremedium",
            align: "center",
        };

        this.items = [
            new Verb(this, play.game, PANEL_WIDTH / 4, SimpleGame.HEIGHT - PANEL_HEIGHT / 4 * 3, Verb.WALK_TO, style),
            new Verb(this, play.game, PANEL_WIDTH / 4 * 3, SimpleGame.HEIGHT - PANEL_HEIGHT / 4 * 3, Verb.LOOK_AT, style),
            new Verb(this, play.game, PANEL_WIDTH / 4, SimpleGame.HEIGHT - PANEL_HEIGHT / 4, Verb.PICK_UP, style),
            new Verb(this, play.game, PANEL_WIDTH / 4 * 3, SimpleGame.HEIGHT - PANEL_HEIGHT / 4, Verb.USE, style)
        ];

        this.play = play;
        this.setCurrentVerb(this.items[0]);
    }

    public render () {
        this.items.forEach(function (verb) {
            this.play.add.existing(verb);
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
        if (false === this.play.hasAction()) {
            this.currentItem = verb;

            this.update();
        }
    }

    getCurrentVerb(): Verb {
        return this.currentItem;
    }

    setCurrentVerbName(verbName: string) {
        this.setCurrentVerb(this.items.find(function (verb) {
            return verb.getName() === verbName;
        }));
    }
}
