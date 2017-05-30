
const BABY_SPEED = 10;

export class Baby extends Phaser.Sprite
{
    private goalX: number;

    public constructor(game: Phaser.Game, x: number, y: number, key?: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?: string | number)
    {
        super(game, x, y, key, frame);

        this.goalX = null;
        this.scale.setTo(4);
    }

    setGoalXTo(x: number) {
        this.goalX = x;
    }

    updatePosition() {
        if (this.goalX !== null) {
            console.log(this.goalX);
            let diff = this.goalX - this.position.x;
            if (Math.abs(diff) <= BABY_SPEED) {
                this.position.setTo(this.goalX, this.position.y);
                this.goalX = null;
            } else {
                let vector = (diff > 0) ? BABY_SPEED : -BABY_SPEED;
                this.position.setTo(this.position.x + vector, this.position.y);
            }
        }
    }
}
