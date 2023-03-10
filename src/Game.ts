import "phaser";

import { Button } from "./Button";
import { Card } from "./Card";

import { WinDisplay } from "./WinDisplay";
import { BetDisplay } from "./BetDisplay";
import { CreditsDisplay } from "./CreditsDisplay";
import { DealButton } from "./DealButton";

class JacksOrBetter extends Phaser.Scene {
  constructor() {
    super({ key: "JacksOrBetter" });
  }

  preload() {
    this.load.spritesheet("cards", "assets/cards/small_spritesheet.png", {
      frameWidth: 125,
      frameHeight: 182,
    });
    this.load.spritesheet("hold_button", "assets/buttons/hold_button.png", {
      frameWidth: 130,
      frameHeight: 50,
    });
    this.load.spritesheet("drop_button", "assets/buttons/drop_button.png", {
      frameWidth: 130,
      frameHeight: 50,
    });
    this.load.spritesheet("deal_button", "assets/buttons/deal_button.png", {
      frameWidth: 130,
      frameHeight: 50,
    });
    this.load.spritesheet("draw_button", "assets/buttons/draw_button.png", {
      frameWidth: 130,
      frameHeight: 50,
    });
    this.load.spritesheet("pass_button", "assets/buttons/pass_button.png", {
      frameWidth: 130,
      frameHeight: 50,
    });
    this.load.audio('click', ['assets/audio/click.mp3', 'assets/audio/click.ogg']);
  }

  create() {
    const holdTextStyle = {
      fontFamily: "Noto, nagiri, sans-serif",
      color: "#ffffff",
      fixedWidth: 125,
      align: "center",
      fontStyle: "bold",
      fontSize: "24px",
    };

    this.add.existing(new Card(this, 60, 0));
    this.add.existing(new Card(this, 200, 0));
    this.add.existing(new Card(this, 340, 0));
    this.add.existing(new Card(this, 480, 0));
    this.add.existing(new Card(this, 620, 0));

    const winDisplay = new WinDisplay(this, 120, 370);
    const betDisplay = new BetDisplay(this, 260, 370);
    const creditsDisplay = new CreditsDisplay(this, 470, 370);

    this.add.existing(winDisplay);
    this.add.existing(betDisplay);
    this.add.existing(creditsDisplay);

    const betButton = new DealButton(this, 680, 370);
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 400,
  scene: [JacksOrBetter],
  pixelArt: true,
  backgroundColor: "#0412a6",
  parent: "game",
};

const game = new Phaser.Game(config);
