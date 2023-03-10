import { GameObjects, Scene } from "phaser";
import { DEAL_BUTTON_SPRITESHEET, DRAW_BUTTON_SPRITESHEET, PASS_BUTTON_SPRITESHEET } from "./Constants";
import { Button } from "./Button";

export class DealButton extends GameObjects.Container {
  constructor(
    scene: Scene,
    x: number,
    y: number,
  ) {
    super(scene, x, y);
    const button = new Button(scene, x, y, DEAL_BUTTON_SPRITESHEET, () => {});
    scene.add.existing(button);
  }
}
