import { Card } from "./Card";

import { Suit, Face } from "./Constants";

export class Hand {
  private _cards: Card[];

  constructor() {
    this._cards = [];
  }

  public addCard(card: Card): void {
    this._cards.push(card);
  }

  public get cards(): Card[] {
    return this._cards;
  }

  public getPayout(): number {
    const counts = this.getCardCounts();
    const pairs = this.getPairs(counts);
    const threeOfAKind = this.getThreeOfAKind(counts);
    const straight = this.getStraight();
    const flush = this.getFlush();
    const fullHouse = this.getFullHouse(counts);
    const fourOfAKind = this.getFourOfAKind(counts);
    const straightFlush = this.getStraightFlush();
    const royalFlush = this.getRoyalFlush();

    if (royalFlush) {
      return 4000;
    } else if (straightFlush) {
      return 250;
    } else if (fourOfAKind) {
      return 125;
    } else if (fullHouse) {
      return 45;
    } else if (flush) {
      return 30;
    } else if (straight) {
      return 20;
    } else if (threeOfAKind) {
      return 15;
    } else if (pairs.length === 2) {
      return 10;
    } else if (pairs.length === 1 && pairs[0] >= 11) {
      return 5;
    } else {
      return 0;
    }
  }

  private getCardCounts(): Map<number, number> {
    const counts = new Map<number, number>();
    for (const card of this.cards) {
      const value = card.value;
      const count = counts.get(value) || 0;
      counts.set(value, count + 1);
    }
    return counts;
  }

  private getPairs(counts: Map<number, number>): number[] {
    const pairs: number[] = [];
    for (const [value, count] of counts.entries()) {
      if (count === 2) {
        pairs.push(value);
      }
    }
    return pairs;
  }

  private getThreeOfAKind(counts: Map<number, number>): boolean {
    for (const count of counts.values()) {
      if (count === 3) {
        return true;
      }
    }
    return false;
  }

  private getStraight(): boolean {
    const values = this.cards.map((card) => card.value);
    values.sort((a, b) => a - b);
    for (let i = 0; i < 4; i++) {
      if (values[i] + 1 !== values[i + 1]) {
        return false;
      }
    }
    return true;
  }

  private getFlush(): boolean {
    const suits = this.cards.map((card) => card.suit);
    for (let i = 0; i < 4; i++) {
      if (suits[i] !== suits[i + 1]) {
        return false;
      }
    }
    return true;
  }

  private getFullHouse(counts: Map<number, number>): boolean {
    let hasPair = false;
    let hasThreeOfAKind = false;
    for (const count of counts.values()) {
      if (count === 2) {
        hasPair = true;
      } else if (count === 3) {
        hasThreeOfAKind = true;
      }
    }
    return hasPair && hasThreeOfAKind;
  }

  private getFourOfAKind(counts: Map<number, number>): boolean {
    for (const count of counts.values()) {
      if (count === 4) {
        return true;
      }
    }
    return false;
  }

  private getStraightFlush(): boolean {
    const suits = this.cards.map((card) => card.suit);
    const values = this.cards.map((card) => card.value);
    values.sort((a, b) => a - b);
    for (let i = 0; i < 4; i++) {
      if (suits[i] !== suits[i + 1] || values[i] + 1 !== values[i + 1]) {
        return false;
      }
    }
    return true;
  }

  private getRoyalFlush(): boolean {
    const values = this.cards.map((card) => card.value);
    const suits = this.cards.map((card) => card.suit);
    const isFlush = suits.every((suit) => suit === suits[0]);
    const hasAce = values.includes(Face.Ace);
    const hasKing = values.includes(Face.King);
    const hasQueen = values.includes(Face.Queen);
    const hasJack = values.includes(Face.Jack);
    const hasTen = values.includes(Face.Ten);
    return isFlush && hasAce && hasKing && hasQueen && hasJack && hasTen;
  }
}
