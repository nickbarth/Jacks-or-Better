import { Card, Suit, Face } from "./Card";

export class Deck {
  private cards: Card[];

  constructor() {
    this.cards = [];

    for (let suit = 0; suit < Object.keys(Suit).length / 2; suit++) {
      for (let face = 0; face < Object.keys(Face).length / 2; face++) {
        this.cards.push(new Card(suit, face));
      }
    }

    this.shuffle();
  }

  public draw(): Card {
    return this.cards.pop()!;
  }

  public shuffle(): void {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }
}
