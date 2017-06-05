

import Play from "./state/Play";
import {InventoryObject} from "./inventory_objects/InventoryObject";
import {Verb} from "./verbs/Verb";
import {SimpleGame} from "../app";

export class Cursor extends Phaser.Sprite {
    private play_: Play;
    private inventoryObject: InventoryObject;

    constructor(play: Play) {
        super(play.game, 0, 0, 'cursor');

        this.play_ = play;
        this.anchor.setTo(0.5);
        this.scale.setTo(SimpleGame.SCALE);
        this.inventoryObject = null;

        play.game.add.existing(this);
    }

    update() {
        let position = this.game.input.mousePointer;
        let positionX = Math.round(position.worldX / SimpleGame.SCALE) * SimpleGame.SCALE + 2;
        let positionY = Math.round(position.worldY / SimpleGame.SCALE) * SimpleGame.SCALE + 2;

        this.position.set(positionX, positionY);

        if (this.inventoryObject) {
            this.inventoryObject.position.set(positionX, positionY);
        }
    }

    attach(inventoryObject: InventoryObject) {
        if (null !== this.inventoryObject) {
            this.detach();
        }
        this.play_.getVerbRepository().setCurrentVerbName(Verb.USE);
        this.play_.getSentence().setObject(inventoryObject);

        this.inventoryObject = inventoryObject;
    }

    detach() {
        if (null !== this.inventoryObject) {
            this.inventoryObject.detach();
            this.inventoryObject = null;
            this.play_.getVerbRepository().setCurrentVerbName(Verb.WALK_TO);
        }
    }

    getInventoryObject(): InventoryObject|null {
        return this.inventoryObject;
    }
}
