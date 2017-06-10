
import Play from "./state/Play";
import {InteractiveObject} from "./InteractiveObject";
import {SimpleGame} from "../app";

const BABY_SPEED = 3;

export class Baby extends InteractiveObject
{
    private walking: boolean;
    private walkingSprite: Phaser.Sprite;

    public constructor(play: Play)
    {
        super(play);

        this.walking = false;
        this.walkingSprite = new Phaser.Sprite(play.game, 1200, 66*SimpleGame.SCALE, 'babyanim');
        this.walkingSprite.scale.setTo(SimpleGame.SCALE);
        this.walkingSprite.anchor.x = 0.5;
        this.walkingSprite.anchor.y = 1;
        this.walkingSprite.animations.add('walk');
        this.walkingSprite.visible = false;
        this.setSprite(
            new Phaser.Sprite(play.game, 1200, 66*SimpleGame.SCALE, 'baby')
        );
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 1;
    }

    updatePosition(goalX: number) {
        let diff = goalX - this.sprite.position.x;

        if (Math.abs(diff) <= BABY_SPEED) {
            this.sprite.position.setTo(goalX, this.sprite.position.y);
            this.walkingSprite.position.setTo(goalX, this.sprite.position.y);

            this.walking = false;
            this.sprite.visible = true;
            this.sprite.scale.x = (diff > 0) ? SimpleGame.SCALE : -SimpleGame.SCALE;
            this.walkingSprite.visible = false;

            return true;
        }

        if (!this.walking) {
            this.walking = true;
            this.sprite.visible = false;
            this.walkingSprite.visible = true;
            this.walkingSprite.animations.play('walk', 15, true);
        }

        if (this.walking) {
            this.walkingSprite.scale.x = (diff > 0) ? -SimpleGame.SCALE : SimpleGame.SCALE;
        } else {
            this.sprite.scale.x = (diff > 0) ? SimpleGame.SCALE : -SimpleGame.SCALE;
        }

        let vector = (diff > 0) ? BABY_SPEED : -BABY_SPEED;
        let newPos = this.sprite.position.x + vector;

        this.sprite.position.setTo(newPos, this.sprite.position.y);
        this.walkingSprite.position.setTo(newPos, this.walkingSprite.position.y);

        return false;
    }

    static get BABY_SPEED():number {
        return BABY_SPEED;
    }

    getStroke(): string {
        return '#ffffff';
    }

    getSprites() {
        return [this.sprite, this.walkingSprite];
    }

    getWorldPosition(): PIXI.Point {
        if (this.walking) {
            return this.walkingSprite.worldPosition;
        } else {
            return this.sprite.worldPosition;
        }
    }
}
