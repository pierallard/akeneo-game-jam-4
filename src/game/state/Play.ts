
import {Baby} from "../Baby";

export default class Play extends Phaser.State
{
    private debug: boolean = false;
    private baby: Baby;

    public constructor()
    {
        super();
    }

    public create()
    {
        if (this.debug) {
            this.game.time.advancedTiming = true
        }
        this.game.stage.backgroundColor = '#000000';
        this.game.antialias = false;

        this.game.load.image('baby', 'assets/baby.png');

        this.baby = new Baby(this.game, 500, 500, 'baby');
        this.game.add.sprite(0, 160, 'baby');

        let graphics = this.game.add.graphics(0, 0);
        graphics.lineStyle(1, 0xFFFFFF, 1);
        let size = (16 + 8) * 4;
        graphics.drawRect(0, 0, 250*4, 500 - size);
        for (let i = 0;i<100;i++) {
            graphics.drawRect(i * size, 500-size, size, size);
        }
    }

    public update()
    {
        this.baby.update();

        if (this.game.input.activePointer.leftButton.isDown) {
            this.baby.setGoalXTo(this.game.input.activePointer.position.x);
        }

        this.baby.updatePosition();
    }
}
