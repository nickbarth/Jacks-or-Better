import { GameObjects, Scene } from "phaser";
import { DISPLAY_STYLE } from "./Constants";

export class CreditsDisplay extends GameObjects.Container {
  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y);

    const background = scene.add.rectangle(0, 0, 260, 50);
    background.setStrokeStyle(3, 0xffffff);
    const display = scene.add.text(0, 0, "CREDITS\n1000", DISPLAY_STYLE).setOrigin(0.5);
    this.add([background, display]);
  }
}
