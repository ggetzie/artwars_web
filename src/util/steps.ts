import {tourState} from "../reducers/tour";
type StepKey = {
  [Property in keyof tourState]: string[];
};

export function dedent(text: string): string {
  return text
    .split("\n")
    .map((t) => t.replace(/^\s+/g, ""))
    .join("\n");
}

const TourSteps: StepKey = {
  city: [
    // 0
    `### Welcome to Art Wars!

    This is a brief tutorial to get acquainted with the controls of the game.

    This is the **City** screen. It contains information about the
    current city and allows you to move to a new city, which advances the
    game one turn.

    Since it's also the first screen, we'll go over some of the common
    controls and information that are used throughout the game.
    `,
    // 1
    `
    This is the status bar. Important information about the state of your game is displayed here.
    `,
    // 2
    `
    Your current cash balance. This can be used to buy artworks, pay taxes, etc.
    `,
    // 3
    `
    The current total value of all the artworks in your portfolio.
    `,
    // 4
    `The current turn and total number of turns in the game`,
    // 5
    `The current **HOT** category of art. Art in this category will be more valuable this turn.
    
    A new hot category will be randomly chosen each turn.
    `,
    // 6
    ``,
    // 7
    ``,
    // 8
    ``,
    // 9
    ``,
    // 10
    ``,
    // 11
    ``,
    // 12
    `
    This is the message board.

    Each turn any game events will be reported here.
    `,
  ],
  portfolioDetail: [],
  portfolioConfirm: [],
  portfolioList: [],
  collectorList: [],
  collectorBuy: [],
  collectorSell: [],
  collectorSellSelect: [],
  auctionList: [],
  auctionBuy: [],
  auctionSell: [],
  auctionSellSelect: [],
  shopList: [],
  shopBuy: [],
};

export default TourSteps;
