import { GameObjects, Scene, Sound } from "phaser";
import { CLICK_SOUND } from "./Constants";

export class Button extends GameObjects.Image {
  private readonly _callback: () => void;
  private readonly _clickSound: Sound.WebAudioSound;

  constructor(
    scene: Scene,
    x: number,
    y: number,
    image: string,
    callback: () => void
  ) {
    super(scene, x, y, image, 0);
    this._callback = callback.bind(scene);
    this.setInteractive({ cursor: "pointer" });
    this.on("pointerdown", this._callback);
    this._clickSound = scene.sound.add(
      CLICK_SOUND
    ) as Phaser.Sound.WebAudioSound;

    this.on("pointerdown", () => {
      this.setFrame(2);
      this._clickSound.play();
    });

    this.on("pointerup", () => {
      this.setFrame(0);
    });

    this.on("pointerover", () => {
      this.setFrame(1);
    });

    this.on("pointerout", () => {
      this.setFrame(0);
    });
  }
}
