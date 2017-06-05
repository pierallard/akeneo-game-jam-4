/// <reference path="../lib/phaser.d.ts"/>

import Boot from "./game/state/Boot";
import Preload from "./game/state/Preload";
import Play from "./game/state/Play";

export class SimpleGame extends Phaser.Game {

    static WIDTH = 800;
    static HEIGHT = 456;
    static SCALE = 4;

    constructor()
    {
        super(
            SimpleGame.WIDTH,
            SimpleGame.HEIGHT,
            Phaser.CANVAS,
            'content',
            null,
            false,
            false
        );

        this.state.add('Boot', Boot);
        this.state.add('Preload', Preload);
        this.state.add('Play', Play);
        this.state.start('Boot');
    }
}

window.onload = () => {
    new SimpleGame();
};
