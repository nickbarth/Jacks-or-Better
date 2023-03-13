import { GameObjects, Scene } from "phaser";
import { DEAL_BUTTON_SPRITESHEET, DRAW_BUTTON_SPRITESHEET } from "./Constants";
import { Button } from "./Button";

export class DealDisplay extends GameObjects.Container {
  private _dealButton: Button;
  private _drawButton: Button;

  constructor(
    scene: Scene,
    x: number,
    y: number,
    handleDealCards: () => void,
    handleDrawCards: () => void
  ) {
    super(scene, x, y);

    this._dealButton = new Button(
      scene,
      x,
      y,
      DEAL_BUTTON_SPRITESHEET,
      handleDealCards
    );

    this._drawButton = new Button(
      scene,
      x,
      y,
      DRAW_BUTTON_SPRITESHEET,
      handleDrawCards
    );

    this._dealButton.visible = true;
    this._drawButton.visible = false;

    scene.add.existing(this._dealButton);
    scene.add.existing(this._drawButton);
  }

  public setDeal(): void {
    this._dealButton.visible = true;
    this._drawButton.visible = false;
  }

  public setDraw(): void {
    this._drawButton.visible = true;
    this._dealButton.visible = false;
  }
}
