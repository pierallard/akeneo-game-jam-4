
import {Action} from "./Action";
import Play from "../state/Play";
import {InventoryObject} from "../inventory_objects/InventoryObject";

export class RemoveInventoryAction extends Action {

    private objectIdentifier: InventoryObject;

    constructor(play: Play, object: InventoryObject) {
        super(play);

        this.objectIdentifier = object;
    }

    execute(): boolean {
        this.play.getInventory().removeItem(this.objectIdentifier);

        return true;
    }

    debugText(): string {
        return undefined;
    }

}
