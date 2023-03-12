import { GameObjects, Scene } from "phaser";
import { DISPLAY_STYLE } from "./Constants";

export class CreditsDisplay extends GameObjects.Container {
  private _scene: Scene;
  private _background: GameObjects.Rectangle;
  private _display: GameObjects.Text;
  private _credits: number;

  constructor(scene: Scene, x: number, y: number, credits: number) {
    super(scene, x, y);

    this._scene = scene;
    this._credits = credits;
    this._background = scene.add.rectangle(0, 0, 260, 50);
    this._background.setStrokeStyle(3, 0xffffff);
    this._display = scene.add.text(0, 0, `CREDITS\n${credits}`, DISPLAY_STYLE);
    this._display.setOrigin(0.5, 0.5);

    this.add([this._background, this._display]);
    scene.add.existing(this);
  }

  public setCredits(credits: number): void {
    this._scene.tweens.addCounter({
      from: this._credits,
      to: credits,
      duration: 200,
      onUpdate: (tween) => {
        this._credits = Math.floor(tween.getValue());
        this._display.setText(`CREDITS\n${this._credits.toString()}`);
      },
    });
  }
}
