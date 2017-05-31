
export default class Preload extends Phaser.State {

    public preload ()
    {
        // Game
        this.game.load.image('baby', 'assets/baby.png');
        this.game.load.image('inventory', 'assets/inventory.png');
        this.game.load.image('arrow_up', 'assets/arrow_up.png');
        this.game.load.image('arrow_down', 'assets/arrow_down.png');
        this.game.load.image('background', 'assets/background.png');
        this.game.load.image('cursor', 'assets/cursor.png');

        // Inventory
        this.game.load.image('cannabis', 'assets/cannabis.png');
        this.game.load.image('engrais', 'assets/engrais.png');
        this.game.load.image('feuilles', 'assets/feuilles.png');
        this.game.load.image('gode', 'assets/gode.png');
        this.game.load.image('icesteak', 'assets/icesteak.png');
        this.game.load.image('knife', 'assets/knife.png');
        this.game.load.image('lexomil', 'assets/lexomil.png');
        this.game.load.image('neon', 'assets/neon.png');
        this.game.load.image('piles', 'assets/piles.png');
        this.game.load.image('rallonge', 'assets/rallonge.png');
        this.game.load.image('sachet', 'assets/sachet.png');
        this.game.load.image('steak', 'assets/steak.png');
        this.game.load.image('tabac', 'assets/tabac.png');
        this.game.load.image('zippo', 'assets/zippo.png');
        this.game.load.image('zipposec', 'assets/zipposec.png');

    }

    public create ()
    {
        this.game.stage.backgroundColor = '#000000';
        this.game.antialias = false;
        this.game.state.start('Play');
    }
}
