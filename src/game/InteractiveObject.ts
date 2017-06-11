
import Play from "./state/Play";
import {SimpleGame} from "../app";

export class InteractiveObject {
    protected play: Play;
    protected sprite: Phaser.Sprite;

    constructor(play: Play) {
        this.play = play;
    }

    public setSprite(sprite: Phaser.Sprite) {
        this.sprite = sprite;
        this.sprite.scale.setTo(SimpleGame.SCALE);
        this.sprite.anchor.x = 0;
        this.sprite.anchor.y = 0;
    }

    getStroke(): string {
        throw 'getStroke should be implemented';
    }

    getWorldPosition(): PIXI.Point {
        return this.sprite.worldPosition;
    }

    getPosition(): PIXI.Point {
        return this.sprite.position;
    }

    getHeight(): number {
        return this.sprite.height;
    }

    destroy() {
        this.sprite.destroy();
    }

    loadTexture(newTexture: string) {
        this.sprite.loadTexture(newTexture);
        this.sprite.update();
    }
}
