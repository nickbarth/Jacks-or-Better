import "phaser";

import { AssetLoader } from "./AssetLoader";
import { Button } from "./Button";

import { CardComponent } from "./CardComponent";
import { WinDisplay } from "./WinDisplay";
import { BetDisplay } from "./BetDisplay";
import { CreditsDisplay } from "./CreditsDisplay";
import { DealButton } from "./DealButton";

import { Deck } from "./Deck";
import { Hand } from "./Hand";
import { Card } from "./Card";
import { Suit, Face } from "./Constants";

class JacksOrBetter extends Phaser.Scene {
  private _cards?: CardComponent[];
  private _deck?: Deck;
  private _hand?: Hand;

  constructor() {
    super({ key: "JacksOrBetter" });
  }

  preload() {
    AssetLoader.preload(this);
  }

  public handleDealCards() {
    this._deck = new Deck();
    this._deck.shuffle();
    this._hand = new Hand();

    for (let i = 0; i < 5; i++) {
      const card = this._deck.draw();
      this._hand.addCard(card);
      this._cards && this._cards[i]?.setCard(card.frame);
    }
  }

  create() {
    this._cards = [
      new CardComponent(this, 60, 0, 52),
      new CardComponent(this, 200, 0, 52),
      new CardComponent(this, 340, 0, 52),
      new CardComponent(this, 480, 0, 52),
      new CardComponent(this, 620, 0, 52),
    ];

    const winDisplay = new WinDisplay(this, 120, 370);
    const betDisplay = new BetDisplay(this, 260, 370);
    const creditsDisplay = new CreditsDisplay(this, 470, 370);

    const betButton = new DealButton(
      this,
      680,
      370,
      this.handleDealCards.bind(this)
    );
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
