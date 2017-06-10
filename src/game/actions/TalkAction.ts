

import {Action} from "./Action";
import Play from "../state/Play";
import {SimpleGame} from "../../app";
import {SceneObject} from "../scene_objects/SceneObject";
import {InteractiveObject} from "../InteractiveObject";

const DIALOG_WIDTH:number = 400;

export class TalkAction extends Action {
    private source: InteractiveObject;
    private text: string;
    private timing: number;
    private textSprite: Phaser.Text;

    constructor(play: Play, source: InteractiveObject, text: string)
    {
        super(play);

        this.source = source;
        this.text = text;
        this.timing = Math.round(50 + 110/68 * this.text.length);
        this.textSprite = null;
    }

    execute(): boolean {
        if (null !== this.textSprite) {

            if (this.text.length) {
                this.textSprite.text = this.textSprite.text + this.text.charAt(0);
                this.text = this.text.substr(1);

                return false;
            }
            else {
                if (this.timing > 0) {
                    this.timing--;

                    return false;
                }
                this.textSprite.destroy();
            }

            return true;
        } else {
            let style = {
                font: "32px 3dventuremedium",
                align: "center",
                wordWrapWidth: DIALOG_WIDTH,
                wordWrap: true,
                stroke: this.source.getStroke(),
                strokeThickness: 20,
            };

            let x = this.source.worldPosition.x;
            if (x < DIALOG_WIDTH / 2) {
                x = DIALOG_WIDTH / 2;
            } else if (x > SimpleGame.WIDTH - DIALOG_WIDTH / 2) {
                x = SimpleGame.WIDTH - DIALOG_WIDTH / 2;
            }
            this.textSprite = this.play.game.add.text(
                x, this.source.worldPosition.y - this.source.height, '', style
            );
            this.textSprite.anchor.setTo(0.5, 1);
            this.textSprite.lineSpacing = -20;

            return false;
        }
    }

    debugText(): string {
        return "TalkAction " + this.timing + ' "' + this.text + '"';
    }


}
