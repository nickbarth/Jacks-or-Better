import { GameObjects, Scene } from "phaser";
import {
  DEAL_BUTTON_SPRITESHEET,
  DRAW_BUTTON_SPRITESHEET,
  PASS_BUTTON_SPRITESHEET,
} from "./Constants";
import { Button } from "./Button";

export class DealDisplay extends GameObjects.Container {
  constructor(scene: Scene, x: number, y: number, handleDealCards: () => void) {
    super(scene, x, y);
    const button = new Button(scene, x, y, DEAL_BUTTON_SPRITESHEET, () => {});
    button.setInteractive({ cursor: "pointer" });
    button.on("pointerdown", handleDealCards);
    scene.add.existing(button);
  }
}
