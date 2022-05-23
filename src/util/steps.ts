import {tourState} from "../reducers/tour";
type StepMap = {
  [Property in keyof tourState]: StepInfo[];
};

type StepInfo = {
  type: "modal" | "tip";
  targetId: string;
  content: string;
};

export function dedent(text: string): string {
  return text
    .split("\n")
    .map((t) => t.replace(/^\s+/g, ""))
    .join("\n");
}

const TourSteps: StepMap = {
  city: [
    {
      type: "modal",
      targetId: "",
      content: `### Welcome to Art Wars!

    This is a brief tutorial to get acquainted with the controls of the game.

    This is the **City** screen. It contains information about the
    current city and allows you to move to a new city, which advances the
    game one turn.

    Since it's also the first screen, we'll go over some of the common
    controls and information that are used throughout the game.
    `,
    },
    {
      type: "tip",
      targetId: "statusBar",
      content: `This is the status bar. Important information about the state of your game is displayed here.`,
    },
    {
      type: "tip",
      targetId: "cashBalance",
      content: `Your current cash balance. This can be used to buy artworks, pay taxes, etc.`,
    },
    {
      type: "tip",
      targetId: "portfolioValue",
      content: `The current total value of all the artworks in your portfolio.`,
    },
    {
      type: "tip",
      targetId: "gameTurns",
      content: `The current turn and total number of turns in the game`,
    },
    {
      type: "tip",
      targetId: "hotCategory",
      content: `The current **HOT** category of art. Art in this category will be more valuable this turn.
    
              A new hot category will be randomly chosen each turn.`,
    },
    {
      type: "tip",
      targetId: "gameNav",
      content: `This is the navigation bar. Click on the icons to view different game screens`,
    },
    {
      type: "tip",
      targetId: "cityLink",
      content: `This button goes to the city screen.
      
      The red background indicates this is the current screen`,
    },
    {
      type: "tip",
      targetId: "portfolioLink",
      content: `This button goes to your portfolio.
      
      There you can view all the art you currently own and move it between cities.`,
    },
    {
      type: "tip",
      targetId: "collectorLink",
      content: `This button goes to the collector.
      
      There you can buy and sell art from the Art Collector that lives in the current city.`,
    },
    {
      type: "tip",
      targetId: "auctionLink",
      content: `This button goes to the auction. 
      
      There you can buy and sell art at the Auction house in the current city.`,
    },
    {
      type: "tip",
      targetId: "shopLink",
      content: `This button goes to the shop
      
      There you can buy power-ups to better avoid taxes and safeguard your collection.`,
    },
    {
      type: "modal",
      targetId: "",
      content: `That covers all of the general controls.
      
      Let's go over some of the elements specific to this screen.`,
    },
    {
      type: "tip",
      targetId: "cityDropdown",
      content: `Select a new city from this list to move to that city.
      
      This advances the game to the next turn, so make sure you've bought and sold everything wanted in the current city first!`,
    },
    {
      type: "tip",
      targetId: "messageBoard",
      content: `This is the message board.

    Each turn any game events will be reported here.`,
    },
    {
      type: "tip",
      targetId: "quitButton",
      content: `Click here to quit the game and return the the main menu at any time.
      
      Your progress is automatically saved and can be reloaded by selecting "Continue" from the main menu.`,
    },
    {
      type: "tip",
      targetId: "helpButton",
      content: `That concludes the tutorial for this screen.
      
      You can review this tutorial again or get help on any screen by clicking this help button.`,
    },
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