import "phaser";

class JacksOrBetter extends Phaser.Scene {
  constructor() {
    super({ key: "JacksOrBetter" });
  }

  preload() {
    this.load.spritesheet("cards", "assets/cards/small_spritesheet.png", {
      frameWidth: 125,
      frameHeight: 182,
    });
    this.load.image("hold_button", "assets/buttons/button_hold.png");
    this.load.image("cancel_button", "assets/buttons/button_cancel.png");
    this.load.image("cardback", "assets/cards/small_cardback.png");
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

    this.add.text(60, 0, "HELD", holdTextStyle);
    this.add.image(120, 120, "cards", 0);
    this.add.image(120, 260, "hold_button");

    this.add.text(200, 0, "HELD", holdTextStyle);
    this.add.image(260, 120, "cards", 1);
    this.add.image(260, 260, "cancel_button");

    this.add.text(340, 0, "HELD", holdTextStyle);
    this.add.image(400, 120, "cards", 2);
    this.add.image(400, 260, "hold_button");

    this.add.text(480, 0, "HELD", holdTextStyle);
    this.add.image(540, 120, "cards", 3);
    this.add.image(540, 260, "hold_button");

    this.add.text(620, 0, "HELD", holdTextStyle);
    this.add.image(680, 120, "cardback");
    this.add.image(680, 260, "hold_button");

    var r1 = this.add.rectangle(120, 370, 125, 50);
    r1.setStrokeStyle(3, 0xffffff);
    this.add.text(60, 310, "WIN", holdTextStyle);
    this.add.text(60, 355, "4000", holdTextStyle);

    var r2 = this.add.rectangle(260, 370, 125, 50);
    r2.setStrokeStyle(3, 0xffffff);
    this.add.text(200, 310, "BET", holdTextStyle);
    this.add.text(200, 355, "5", holdTextStyle);

    var r3 = this.add.rectangle(470, 370, 260, 50);
    r3.setStrokeStyle(3, 0xffffff);
    this.add.text(400, 310, "CREDITS", holdTextStyle);
    this.add.text(400, 355, "1000", holdTextStyle);

    // DEAL Btn -> Draw Button
    this.add.image(680, 370, "hold_button");
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
