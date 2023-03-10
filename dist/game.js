import "phaser";
class MyGame extends Phaser.Scene {
    constructor() {
        super({ key: "MyGame" });
    }
    preload() {
        this.load.image("logo", "cards/clubs_10.png");
    }
    create() {
        const logo = this.add.image(400, 150, "logo");
    }
}
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [MyGame],
};
const game = new Phaser.Game(config);
//# sourceMappingURL=game.js.map