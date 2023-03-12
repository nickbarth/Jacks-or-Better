import { Scene } from "phaser";

import {
  CARD_SPRITESHEET,
  CARD_SIZE,
  DISPLAY_STYLE,
  HOLD_BUTTON_SPRITESHEET,
  DROP_BUTTON_SPRITESHEET,
  DEAL_BUTTON_SPRITESHEET,
  DRAW_BUTTON_SPRITESHEET,
  PASS_BUTTON_SPRITESHEET,
  BUTTON_SIZE,
  CLICK_SOUND,
} from "./Constants";

export class AssetLoader {
  public static preload(scene: Scene): void {
    scene.load.spritesheet(
      CARD_SPRITESHEET,
      "assets/cards/spritesheet.png",
      CARD_SIZE
    );
    scene.load.spritesheet(
      HOLD_BUTTON_SPRITESHEET,
      "assets/buttons/hold_button.png",
      BUTTON_SIZE
    );
    scene.load.spritesheet(
      DROP_BUTTON_SPRITESHEET,
      "assets/buttons/drop_button.png",
      BUTTON_SIZE
    );
    scene.load.spritesheet(
      DEAL_BUTTON_SPRITESHEET,
      "assets/buttons/deal_button.png",
      BUTTON_SIZE
    );
    scene.load.spritesheet(
      DRAW_BUTTON_SPRITESHEET,
      "assets/buttons/draw_button.png",
      BUTTON_SIZE
    );
    scene.load.spritesheet(
      PASS_BUTTON_SPRITESHEET,
      "assets/buttons/pass_button.png",
      BUTTON_SIZE
    );
    scene.load.audio(CLICK_SOUND, [
      "assets/audio/click.mp3",
      "assets/audio/click.ogg",
    ]);
  }
}
