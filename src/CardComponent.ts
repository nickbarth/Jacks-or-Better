import { GameObjects, Scene } from "phaser";
import {
  CARD_SPRITESHEET,
  DISPLAY_STYLE,
  HOLD_BUTTON_SPRITESHEET,
  DROP_BUTTON_SPRITESHEET,
} from "./Constants";
import { Button } from "./Button";

export class CardComponent extends GameObjects.Container {
  private _index;
  private _isHeld = false;
  private _heldLabel: GameObjects.Text;
  private _holdButton: Button;
  private _dropButton: Button;
  private _card: GameObjects.Image;
  private _scene: Scene;
  private _handleHold: (index: number) => void;
  private _handleDrop: (index: number) => void;

  constructor(
    scene: Scene,
    index: number,
    x: number,
    y: number,
    card: number,
    handleHold: (index: number) => void,
    handleDrop: (index: number) => void
  ) {
    super(scene, x, y);
    this._index = index;
    this._scene = scene;
    this._handleHold = handleHold;
    this._handleDrop = handleDrop;
    this._heldLabel = scene.add.text(x, y, "HELD", DISPLAY_STYLE);
    this._heldLabel.visible = false;
    this._card = scene.add.image(x + 60, y + 120, CARD_SPRITESHEET, card);
    this._holdButton = new Button(
      scene,
      x + 60,
      y + 250,
      HOLD_BUTTON_SPRITESHEET,
      () => this._handleHold(this._index)
    );
    this._dropButton = new Button(
      scene,
      x + 60,
      y + 250,
      DROP_BUTTON_SPRITESHEET,
      () => this._handleDrop(this._index)
    );
    scene.add.existing(this._holdButton);
    scene.add.existing(this._dropButton);
    this._holdButton.visible = true;
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

  public setHoldable(isHoldable: boolean): void {
    if (isHoldable) {
      this._isHeld = false;
      this._heldLabel.visible = false;
      this._holdButton.visible = true;
      this._dropButton.visible = false;
    } else {
      this._isHeld = false;
      this._heldLabel.visible = false;
      this._holdButton.visible = false;
      this._dropButton.visible = false;
    }
  }
}
