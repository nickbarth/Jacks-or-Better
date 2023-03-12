import { GameObjects, Scene } from "phaser";
import {
  GameState,
  DEAL_BUTTON_SPRITESHEET,
  DRAW_BUTTON_SPRITESHEET,
  PASS_BUTTON_SPRITESHEET,
} from "./Constants";
import { Button } from "./Button";

export class DealDisplay extends GameObjects.Container {
  private _dealButton: Button;
  private _drawButton: Button;
  private _passButton: Button;

  constructor(
    scene: Scene,
    x: number,
    y: number,
    handleDealCards: () => void,
    handleDrawCards: () => void,
    handlePass: () => void
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

    this._passButton = new Button(
      scene,
      x,
      y,
      PASS_BUTTON_SPRITESHEET,
      handlePass
    );

    this._dealButton.visible = true;
    this._drawButton.visible = false;
    this._passButton.visible = false;

    scene.add.existing(this._dealButton);
    scene.add.existing(this._drawButton);
    scene.add.existing(this._passButton);
  }

  public setGameState(state: GameState): void {
    this._dealButton.visible = false;
    this._drawButton.visible = false;
    this._passButton.visible = false;

    switch (state) {
      case GameState.Deal:
        this._dealButton.visible = true;
        break;
      case GameState.Draw:
        this._drawButton.visible = true;
        console.log(this._drawButton);
        break;
      case GameState.Pass:
        this._passButton.visible = true;
        break;
    }
  }
}
