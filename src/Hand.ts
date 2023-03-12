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

  public replaceCard(index: number, card: Card): void {
    this._cards[index] = card;
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
    } else if (pairs.length === 1 && (pairs[0] >= 11 || pairs[0] === 0)) {
      return 5;
    } else {
      return 0;
    }
  }

  private getCardCounts(): Map<number, number> {
    const counts = new Map<number, number>();
    for (const card of this.cards) {
      const face = card.face;
      const count = counts.get(face) || 0;
      counts.set(face, count + 1);
    }
    return counts;
  }

  private getPairs(counts: Map<number, number>): number[] {
    const pairs: number[] = [];
    for (const [face, count] of counts.entries()) {
      if (count === 2) {
        pairs.push(face);
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

  private getAceHighStraight(): boolean {
    const faces = this.cards.map((card) => card.face);
    return (
      faces.includes(Face.Ace) &&
      faces.includes(Face.King) &&
      faces.includes(Face.Queen) &&
      faces.includes(Face.Jack) &&
      faces.includes(Face.Ten)
    );
  }

  private getStraight(): boolean {
    if (this.getAceHighStraight()) {
      return true;
    }

    const faces = this.cards.map((card) => card.face);
    faces.sort((a, b) => a - b);
    for (let i = 0; i < 4; i++) {
      if (faces[i] + 1 !== faces[i + 1]) {
        return false;
      }
    }

    return true;
  }

  private getFlush(): boolean {
    const suits = this.cards.map((card) => card.suit);
    return suits.every((suit) => suit === suits[0]);
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
    return this.getStraight() && this.getFlush();
  }

  private getRoyalFlush(): boolean {
    return this.getAceHighStraight() && this.getFlush();
  }
}
