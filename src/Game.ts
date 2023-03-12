import "phaser";

import { AssetLoader } from "./AssetLoader";
import { Button } from "./Button";

import { CardComponent } from "./CardComponent";
import { WinDisplay } from "./WinDisplay";
import { BetDisplay } from "./BetDisplay";
import { CreditsDisplay } from "./CreditsDisplay";
import { DealDisplay } from "./DealDisplay";

import { Deck } from "./Deck";
import { Hand } from "./Hand";
import { Card } from "./Card";
import { GameState, Suit, Face } from "./Constants";

class JacksOrBetter extends Phaser.Scene {
  private _cards?: CardComponent[];
  private _deck?: Deck;
  private _hand?: Hand;
  private _gameState: GameState = GameState.Betting;
  private _creditsDisplay?: CreditsDisplay;
  private _betDisplay?: BetDisplay;
  private _winDisplay?: WinDisplay;
  private _credits: number = 1101;

  constructor() {
    super({ key: "JacksOrBetter" });
  }

  preload() {
    AssetLoader.preload(this);
  }

  public get credits(): number {
    return this._credits;
  }

  public set credits(credits: number) {
    this._credits = credits;
    this._creditsDisplay?.setCredits(this._credits);
  }

  public handleDealCards() {
    this._deck = new Deck();
    this._deck.shuffle();
    this._hand = new Hand();
    this.credits -= 5;

    for (let i = 0; i < 5; i++) {
      const card = this._deck.draw();
      this._hand.addCard(card);
      this._cards && this._cards[i]?.setCard(card.frame);
    }
  }

  public handleDrawCards() {
    for (let i = 0; i < 5; i++) {
      if (this._cards && this._hand && this._deck && this._cards[i].isHeld) {
        const card = this._deck.draw();
        this._hand.removeCard(i);
        this._hand.addCard(card);
        this._cards[i]?.setCard(card.frame);
      }
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

    this._winDisplay = new WinDisplay(this, 120, 370);
    this._betDisplay = new BetDisplay(this, 260, 370);
    this._creditsDisplay = new CreditsDisplay(this, 470, 370, this._credits);

    const dealDisplay = new DealDisplay(
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
