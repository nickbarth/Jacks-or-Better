import { GameObjects, Scene } from "phaser";
import { CARD_SPRITESHEET, DISPLAY_STYLE } from "./Constants";
import { Button } from "./Button";

export class Card extends GameObjects.Container {
  private _isHeld = false;

  constructor(
    scene: Scene,
    x: number,
    y: number,
  ) {
    super(scene, x, y);

    scene.add.text(x, y, "HELD", DISPLAY_STYLE);
    scene.add.image(x+60, y+120, "cards", 52);
    scene.add.existing(new Button(scene, x+60, y+260, "hold_button", () => {}));
  }
}
