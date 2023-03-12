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
  private _dealDisplay?: DealDisplay;
  private _credits: number = 1000;

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
    // this._deck.shuffle();
    this._hand = new Hand();
    this.credits -= 5;

    for (let i = 0; i < 5; i++) {
      const card = this._deck.draw();
      this._hand.addCard(card);
      if (this._cards) {
        this._cards[i]?.setCard(card.frame);
        this._cards[i]?.setHoldable(true);
      }
    }

    this._winDisplay?.setWin(0);
    this._dealDisplay?.setGameState(GameState.Pass);
  }

  public handleDrawCards() {
    if (this._cards && this._hand && this._deck) {
      for (let i = 0; i < 5; i++) {
        if (!this._cards[i].isHeld) {
          const card = this._deck.draw();
          this._hand.replaceCard(i, card);
          this._cards[i].setCard(card.frame);
        }
      }
      const payout = this._hand.getPayout();
      this.credits += payout;
      this._winDisplay?.setWin(payout);
      this._dealDisplay?.setGameState(GameState.Deal);
    }
  }

  public handlePass() {
    if (this._hand) {
      const payout = this._hand.getPayout();
      this.credits += payout;
      this._winDisplay?.setWin(payout);
      this._dealDisplay?.setGameState(GameState.Deal);
    }
  }

  public handleHoldCard(index: number) {
    if (this._cards) {
      this._cards[index].isHeld = true;
      this._dealDisplay?.setGameState(GameState.Draw);
    }
  }

  public handleDropCard(index: number) {
    if (this._cards) {
      this._cards[index].isHeld = false;
    }
  }

  public handleSkip() {
    this._gameState = GameState.Betting;
  }

  create() {
    this._cards = [];
    const cardX = 60;
    const cardY = 0;
    const cardSpacing = 140;

    for (let i = 0; i < 5; i++) {
      const cardComponent = new CardComponent(
        this,
        i,
        cardX + cardSpacing * i,
        cardY,
        52,
        this.handleHoldCard.bind(this),
        this.handleDropCard.bind(this)
      );

      this._cards.push(cardComponent);
    }

    this._winDisplay = new WinDisplay(this, 120, 370);
    this._betDisplay = new BetDisplay(this, 260, 370);
    this._creditsDisplay = new CreditsDisplay(this, 470, 370, this._credits);

    this._dealDisplay = new DealDisplay(
      this,
      680,
      370,
      this.handleDealCards.bind(this),
      this.handleDrawCards.bind(this),
      this.handlePass.bind(this)
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
