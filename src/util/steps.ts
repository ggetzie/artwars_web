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
    `### Welcome to Art Wars!

    This is a brief tutorial to get acquainted with the controls of the game.

    This is the **City** screen. It contains information about the
    current city and allows you to move to a new city, which advances the
    game one turn.

    Since it's also the first screen, we'll go over some of the common
    controls and information that are used throughout the game.
    `,
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
