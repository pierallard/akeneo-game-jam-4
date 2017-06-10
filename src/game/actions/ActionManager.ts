import {Action} from "./Action";
import Play from "../state/Play";
import {Verb} from "../verbs/Verb";

export class ActionManager {
    private actions: Array<Action>;
    private play: Play;

    constructor(play: Play) {
        this.play = play;
        this.actions = [];
    }

    execute() {
        if (this.actions.length) {
            if (this.actions[0].execute() === true) {
                this.actions.shift();
            }
            if (!this.actions.length) {
                this.play.getVerbRepository().setCurrentVerbName(Verb.WALK_TO);
            }
        }
    }

    addAction(action: Action) {
        this.addActions([action]);
    }

    addActions(actions: Array<Action>) {
        if (this.hasAction()) {
            return;
        }

        this.actions = this.actions.concat(actions);
    }

    hasAction(): boolean {
        return this.actions.length > 0;
    }

    getActions(): Array<Action> {
        return this.actions;
    }
}
