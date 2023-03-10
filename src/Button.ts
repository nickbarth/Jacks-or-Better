import { GameObjects, Scene, Sound } from "phaser";

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
    this.setInteractive({ cursor: 'pointer' });
    this.on("pointerdown", this._callback);
    this._clickSound = scene.sound.add("click") as Phaser.Sound.WebAudioSound;

    this.on(
      "pointerdown", () => {
        this.setFrame(2);
        this._clickSound.play();
      }
    );

    this.on(
      "pointerover",
      () => {
        this.setFrame(1);
      }
    );

    this.on(
      "pointerout",
      () => {
        this.setFrame(0);
      }
    );
  }
}
