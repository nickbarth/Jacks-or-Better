import "phaser";

import { AssetLoader } from "./AssetLoader";
import { Button } from "./Button";

import { CardComponent } from "./CardComponent";
import { WinDisplay } from "./WinDisplay";
import { BetDisplay } from "./BetDisplay";
import { CreditsDisplay } from "./CreditsDisplay";
import { DealDisplay } from "./DealDisplay";
import { RankDisplay } from "./RankDisplay";

import { Deck } from "./Deck";
import { Hand } from "./Hand";
import { Card } from "./Card";
import { Payout, HandRank, Suit, Face } from "./Constants";

class JacksOrBetter extends Phaser.Scene {
  private _cards?: CardComponent[];
  private _deck?: Deck;
  private _hand?: Hand;
  private _creditsDisplay?: CreditsDisplay;
  private _betDisplay?: BetDisplay;
  private _winDisplay?: WinDisplay;
  private _dealDisplay?: DealDisplay;
  private _rankDisplay?: RankDisplay;
  private _credits: number = 1000;
  private _bellSound?: Phaser.Sound.WebAudioSound;

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
      if (this._cards && this._cards[i]) {
        this._cards[i].setCard(card.frame);
        this._cards[i].setHoldable(true);
      }
    }

    this._winDisplay?.setWin(0);
    this._dealDisplay?.setDraw();
    this._rankDisplay?.setRank("");
  }

  public handleDrawCards() {
    if (!this._cards || !this._hand || !this._deck) {
      return;
    }

    for (let i = 0; i < 5; i++) {
      if (!this._cards[i].isHeld) {
        const card = this._deck.draw();
        this._hand.replaceCard(i, card);
        this._cards[i].setCard(card.frame);
      }
    }

    const handrank = this._hand.getHandRank();
    this.credits += Payout[handrank];
    this._winDisplay?.setWin(Payout[handrank]);
    this._dealDisplay?.setDeal();
    this._rankDisplay?.setRank(handrank);

    for (let i = 0; i < 5; i++) {
      this._cards[i]?.setHoldable(false);
    }

    if (handrank !== HandRank.Loss) {
      this._bellSound?.play();
    }
  }

  public handleHoldCard(index: number) {
    if (this._cards) {
      this._cards[index].isHeld = true;
    }
  }

  public handleDropCard(index: number) {
    if (this._cards) {
      this._cards[index].isHeld = false;
    }
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

    this._bellSound = this.sound.add("bell") as Phaser.Sound.WebAudioSound;
    this._rankDisplay = new RankDisplay(this, 400, 255);
    this._winDisplay = new WinDisplay(this, 120, 320);
    this._betDisplay = new BetDisplay(this, 260, 320);
    this._creditsDisplay = new CreditsDisplay(this, 470, 320, this._credits);
    this._dealDisplay = new DealDisplay(
      this,
      680,
      320,
      this.handleDealCards.bind(this),
      this.handleDrawCards.bind(this)
    );
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 350,
  scene: [JacksOrBetter],
  pixelArt: true,
  backgroundColor: "#0412a6",
  parent: "game",
};

const game = new Phaser.Game(config);
