import { GameObjects, Scene } from "phaser";
import {
  CARD_SPRITESHEET,
  DISPLAY_STYLE,
  HOLD_BUTTON_SPRITESHEET,
  DROP_BUTTON_SPRITESHEET,
} from "./Constants";
import { Button } from "./Button";

export class CardComponent extends GameObjects.Container {
  private _isHeld = false;
  private _heldLabel: GameObjects.Text;
  private _holdButton: Button;
  private _dropButton: Button;
  private _card: GameObjects.Image;
  private _scene: Scene;

  constructor(scene: Scene, x: number, y: number, card: number) {
    super(scene, x, y);

    this._scene = scene;
    this._heldLabel = scene.add.text(x, y, "HELD", DISPLAY_STYLE);
    this._heldLabel.visible = this.isHeld;
    this._card = scene.add.image(x + 60, y + 120, CARD_SPRITESHEET, card);
    this._holdButton = new Button(
      scene,
      x + 60,
      y + 260,
      HOLD_BUTTON_SPRITESHEET,
      () => (this.isHeld = true)
    );
    this._dropButton = new Button(
      scene,
      x + 60,
      y + 260,
      DROP_BUTTON_SPRITESHEET,
      () => (this.isHeld = false)
    );
    scene.add.existing(this._holdButton);
    scene.add.existing(this._dropButton);
    this._dropButton.visible = false;
  }

  public setCard(frame: number): void {
    this._card.setFrame(52);
    this._scene.add.tween({
      targets: this._card,
      scaleX: 0,
      scaleY: 1.2,
      duration: 100,
      ease: "Linear",
      onComplete: () => {
        this._card.setFrame(frame);
        this._scene.add.tween({
          targets: this._card,
          scaleX: 1,
          scaleY: 1,
          duration: 100,
          ease: "Linear",
        });
      },
    });
  }

  public set isHeld(value: boolean) {
    this._isHeld = value;
    this._heldLabel.visible = value;
    this._holdButton.visible = !value;
    this._dropButton.visible = value;
  }

  public get isHeld(): boolean {
    return this._isHeld;
  }
}
