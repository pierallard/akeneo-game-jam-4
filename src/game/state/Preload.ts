
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

        // Scene
        this.game.load.image('fridgeClose', 'assets/fridgeClose.png');
        this.game.load.image('fridgeOpen', 'assets/fridgeOpen.png');
        this.game.load.image('placardClose', 'assets/placardClose.png');
        this.game.load.image('placardOpen', 'assets/placardOpen.png');
        this.game.load.image('microOndes', 'assets/microondes.png');
        this.game.load.image('gamelleVide', 'assets/gamelleVide.png');
        this.game.load.image('gamellePleine', 'assets/gamellePleine.png');
        this.game.load.image('porteGarage', 'assets/porteGarage.png');
        this.game.load.image('porteGarageOpen', 'assets/porteGarageOpen.png');
        this.game.load.image('porteChambre', 'assets/porteChambre.png');
        this.game.load.image('porteChambreOpen', 'assets/porteChambreOpen.png');
        this.game.load.image('chien', 'assets/chien.png');
        this.game.load.image('chaineClose', 'assets/chaineClose.png');
        this.game.load.image('chaineOpen', 'assets/chaineOpen.png');
        this.game.load.image('prisepetee', 'assets/prisepetee.png');
        this.game.load.image('bouteille', 'assets/bouteille.png');
        this.game.load.image('potvide', 'assets/potvide.png');
        this.game.load.image('four', 'assets/four.png');

        // Inventory
        this.game.load.image('cannabis', 'assets/cannabis.png');
        this.game.load.image('engrais', 'assets/engrais.png');
        this.game.load.image('feuilles', 'assets/feuilles.png');
        this.game.load.image('gode', 'assets/gode.png');
        this.game.load.image('icesteak', 'assets/icesteak.png');
        this.game.load.image('escabeau', 'assets/escabeau.png');
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
