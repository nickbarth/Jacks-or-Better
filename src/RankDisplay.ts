import { GameObjects, Scene } from "phaser";
import { DISPLAY_STYLE } from "./Constants";

export class RankDisplay extends GameObjects.Container {
  private _rankDisplay: GameObjects.Text;

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y);
    this._rankDisplay = scene.add.text(0, 0, "", {...DISPLAY_STYLE, fixedWidth: 200});
    this._rankDisplay.setOrigin(0.5);
    this.add(this._rankDisplay);
    scene.add.existing(this);
  }

  public setRank(rank: string): void {
    this._rankDisplay.setText(rank);
  }
}
