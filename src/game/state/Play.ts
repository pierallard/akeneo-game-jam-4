
export default class Play extends Phaser.State
{
    private debug: boolean = false;
    private baby: Phaser.Sprite;

    public create()
    {
        if (this.debug) {
            this.game.time.advancedTiming = true
        }
        this.game.stage.backgroundColor = '#000000';
        this.game.antialias = false;

        this.game.load.image('baby', 'assets/baby.png');
        this.baby = this.game.add.sprite(0, 160, 'baby');
        this.baby.scale.setTo(4);
    }

    public update()
    {
    }
}
