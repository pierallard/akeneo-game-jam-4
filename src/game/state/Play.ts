
export default class Play extends Phaser.State
{
    private debug: boolean = false;

    public create()
    {
        if (this.debug) {
            this.game.time.advancedTiming = true
        }
        this.game.stage.backgroundColor = '#000000';
        this.game.antialias = false;
    }

    public update()
    {
    }
}
