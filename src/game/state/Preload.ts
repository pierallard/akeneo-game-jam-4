
export default class Preload extends Phaser.State {

    public preload ()
    {
        this.game.load.image('baby', 'assets/baby.png');
    }

    public create ()
    {
        this.game.stage.backgroundColor = '#000000';
        this.game.antialias = false;
        this.game.state.start('Play');
    }
}
