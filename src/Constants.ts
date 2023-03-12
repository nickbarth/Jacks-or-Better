export const BUTTON_SIZE = { frameWidth: 130, frameHeight: 50 };
export const HOLD_BUTTON_SPRITESHEET = "hold_button";
export const DROP_BUTTON_SPRITESHEET = "drop_button";
export const DEAL_BUTTON_SPRITESHEET = "deal_button";
export const DRAW_BUTTON_SPRITESHEET = "draw_button";
export const PASS_BUTTON_SPRITESHEET = "pass_button";

export const CARD_SIZE = { frameWidth: 125, frameHeight: 182 };
export const CARD_SPRITESHEET = "cards";
export const CARD_BACK_IMAGE = "cardback";

export const CLICK_SOUND = "click";

export enum GameState {
  Betting,
  Deal,
  Draw,
  Pass,
}

export enum HandRank {
  RoyalFlush = "ROYAL FLUSH",
  StraightFlush = "STRAIGHT FLUSH",
  FourOfAKind = "FOUR OF A KIND",
  FullHouse = "FULL HOUSE",
  Flush = "FLUSH",
  Straight = "STRAIGHT",
  ThreeOfAKind = "THREE OF A KIND",
  TwoPair = "TWO PAIR",
  JacksOrBetter = "JACK OR BETTER",
  Lose = "",
}

export const Payout = {
  [HandRank.RoyalFlush]: 4000,
  [HandRank.StraightFlush]: 250,
  [HandRank.FourOfAKind]: 125,
  [HandRank.FullHouse]: 45,
  [HandRank.Flush]: 30,
  [HandRank.Straight]: 20,
  [HandRank.ThreeOfAKind]: 15,
  [HandRank.TwoPair]: 10,
  [HandRank.JacksOrBetter]: 5,
  [HandRank.Lose]: 0,
}

export enum Suit {
  Spades,
  Diamonds,
  Hearts,
  Clubs,
}

export enum Face {
  Ace,
  Two,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine,
  Ten,
  Jack,
  Queen,
  King,
}

export const DISPLAY_STYLE = {
  fontFamily: "Noto, nagiri, sans-serif",
  color: "#ffffff",
  fixedWidth: 125,
  align: "center",
  fontStyle: "bold",
  fontSize: "20px",
};
