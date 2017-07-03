import {SceneObject} from "./SceneObject";
import Play from "../state/Play";
import {SimpleGame} from "../../app";

export class FinalAnim extends SceneObject {
    constructor(play: Play) {
        super(play, FinalAnim.IDENTIFIER, 200, 0, 'baby');

        this.setSprite(new Phaser.Sprite(play.game, 352*SimpleGame.SCALE, 16*SimpleGame.SCALE, 'caranim'))
        this.sprite.animations.add('a');
        this.hide();
    }

    display() {
        super.display();
        this.sprite.animations.play('a', 15, false);
    }

    static get IDENTIFIER()
    {
        return 'finalanim';
    }
}
