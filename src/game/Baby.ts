
import Play from "./state/Play";
import {InteractiveObject} from "./InteractiveObject";
import {SimpleGame} from "../app";

const BABY_SPEED = 3;

export class Baby extends InteractiveObject
{
    private walking: boolean;

    public constructor(play: Play, x: number, y: number, key?: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?: string | number)
    {
        super(play.game, x, y, key, frame);

        this.scale.setTo(SimpleGame.SCALE);
        this.anchor.x = 0.5;
        this.anchor.y = 1;
        this.loadTexture('babyanim');
        let toto = this.animations.add('walk');
        console.log(toto.frameTotal);
        this.loadTexture('baby');
        this.walking = false;
    }

    updatePosition(goalX: number) {
        let diff = goalX - this.position.x;

        if (Math.abs(diff) <= BABY_SPEED) {
            this.position.setTo(goalX, this.position.y);

            this.walking = false;
            this.loadTexture('baby');

            if (this.walking) {
                this.scale.x = (diff > 0) ? -SimpleGame.SCALE : SimpleGame.SCALE;
            } else {
                this.scale.x = (diff > 0) ? SimpleGame.SCALE : -SimpleGame.SCALE;
            }

            return true;
        }

        if (!this.walking) {
            this.walking = true;

            this.loadTexture('babyanim');
            this.animations.play('walk', 15, true);
        }

        if (this.walking) {
            this.scale.x = (diff > 0) ? -SimpleGame.SCALE : SimpleGame.SCALE;
        } else {
            this.scale.x = (diff > 0) ? SimpleGame.SCALE : -SimpleGame.SCALE;
        }

        let vector = (diff > 0) ? BABY_SPEED : -BABY_SPEED;
        let newPos = this.position.x + vector;

        this.position.setTo(newPos, this.position.y);

        return false;
    }

    static get BABY_SPEED():number {
        return BABY_SPEED;
    }

    getStroke(): string {
        return '#ffffff';
    }
}
