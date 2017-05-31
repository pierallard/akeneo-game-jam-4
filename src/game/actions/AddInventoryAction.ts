
import {Action} from "./Action";
import Play from "../state/Play";

export class AddInventoryAction extends Action {

    private objectIdentifier: string;

    constructor(play: Play, objectIndentifier: string) {
        super(play);

        this.objectIdentifier = objectIndentifier;
    }

    execute(): boolean {
        this.play.getInventory().addItem(this.objectIdentifier);

        return true;
    }

    debugText(): string {
        return undefined;
    }

}
