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
  }

  create() {
    this.add.image(120, 400, "cards", 0);
    this.add.image(260, 400, "cards", 1);
    this.add.image(400, 400, "cards", 2);
    this.add.image(540, 400, "cards", 3);
    this.add.image(680, 400, "cards", 3);
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [JacksOrBetter],
  pixelArt: true,
};

const game = new Phaser.Game(config);
