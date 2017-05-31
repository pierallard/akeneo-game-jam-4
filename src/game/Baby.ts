
const BABY_SPEED = 3;

export class Baby extends Phaser.Sprite
{
    public constructor(game: Phaser.Game, x: number, y: number, key?: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?: string | number)
    {
        super(game, x, y, key, frame);

        this.scale.setTo(4);
        this.anchor.x = 0.5;
        this.anchor.y = 1;
    }

    updatePosition(goalX: number) {
        let diff = goalX - this.position.x;

        if (Math.abs(diff) <= BABY_SPEED) {
            this.position.setTo(goalX, this.position.y);

            return true;
        }

        let vector = (diff > 0) ? BABY_SPEED : -BABY_SPEED;
        this.position.setTo(this.position.x + vector, this.position.y);

        return false;
    }
}
