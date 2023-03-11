import { Suit, Face } from "./Constants";

export class Card {
  private _suit: Suit;
  private _face: Face;

  constructor(suit: Suit, face: Face) {
    console.log("created", suit, face);
    this._suit = suit;
    this._face = face;
  }

  public get suit(): Suit {
    return this._suit;
  }

  public get face(): Face {
    return this._face;
  }

  public get frame(): number {
    console.log(this._face, this._suit, this._face + this._suit * 13);
    return this._face + this._suit * 13;
  }
}
