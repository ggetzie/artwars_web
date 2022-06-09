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
      content: `The current **HOT** category. Art in this category will be more valuable this turn.
    
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
      content: `This button goes to the collector screen.
      
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
      type: "tip",
      targetId: "quitButton",
      content: `Click here to quit the game and return the the main menu at any time.
      
      Your progress is automatically saved and can be reloaded by selecting "Continue" from the main menu.`,
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
      targetId: "helpButton",
      content: `That concludes the tutorial for this screen.
      
      You can review this tutorial again or get help on any screen by clicking this help button.`,
    },
  ],
  portfolioDetail: [
    {
      type: "modal",
      targetId: "",
      content: `Welcome to the portfolio detail screen. Here you can view all the information about your artwork.`,
    },
    {
      type: "tip",
      targetId: "cityMoveSelect",
      content: `To sell artwork in a different city, you need to move it there. 
      
      Select the city you want to move the artwork to from this list.`,
    },
    {
      type: "tip",
      targetId: "moveConfirm",
      content: `then click this button to proceed.`,
    },
  ],
  portfolioConfirm: [
    {
      type: "modal",
      targetId: "",
      content: `Moving an artwork to a new city will incur an import duty
      unless you have a freeport in that city or a yacht.`,
    },
    {
      type: "tip",
      targetId: "dutyMsg",
      content: `Check the amount of the import duty here. 
      
      If you don't have enough cash available, you'll need to sell some other artworks to raise funds.`,
    },
    {
      type: "tip",
      targetId: "cancelMove",
      content: `If you don't want to move, click Cancel to return to the detail screen.`,
    },
    {
      type: "tip",
      targetId: "confirmMove",
      content: `Otherwise, click Confirm to proceed with the move.`,
    },
  ],
  portfolioList: [
    {
      type: "modal",
      targetId: "",
      content: `This is the portfolio screen. Here you can view all the artworks you currently own.`,
    },
    {
      type: "tip",
      targetId: "portfolioList",
      content: `Artworks are arranged by city. Artworks can only be bought or sold in the city where they reside.`,
    },
    {
      type: "tip",
      targetId: "exampleArt",
      content: `Click on any artwork in the list to view more details.`,
    },
  ],
  collectorList: [
    {
      type: "modal",
      targetId: "",
      content: `Welcome to the Collector screen. Every city is home to a resident art collector. 
      
      You can buy and sell artworks from them on the private market.`,
    },
    {
      type: "tip",
      targetId: "collectorLikes",
      content: `Every collector has a favorite category of artwork. Keep an eye out for it!
      
      Collectors will pay more when buying art in their favorite category, but they'll also demand a higher price when selling.`,
    },
    {
      type: "tip",
      targetId: "collectorArtList",
      content: `All the artworks owned by this collector are listed here.`,
    },
    {
      type: "tip",
      targetId: "collectorArtListItem",
      content: `Click on any artwork in the list to view it and make an offer to buy it.`,
    },
    {
      type: "tip",
      targetId: "collectorSellButton",
      content: `Click on the Sell button to select one of your artworks to offer for sale to the collector.`,
    },
  ],
  collectorBuy: [
    {
      type: "modal",
      targetId: "",
      content: `Here you can view details about a piece of art owned by this collector and make an offer to buy it.`,
    },
    {
      type: "tip",
      targetId: "artValue",
      content: `Check the current value of the artwork before making an offer. 
      
      Savvy collectors are unlikely to sell at a big discount.`,
    },
    {
      type: "tip",
      targetId: "offerInput",
      content: "Enter the amount you're willing to pay for the artwork here.",
    },
    {
      type: "tip",
      targetId: "offerButton",
      content: `Click this button when you're ready to make your offer.`,
    },
    {
      type: "tip",
      targetId: "collectorDialogue",
      content: `The collector will respond to your offer here.`,
    },
  ],
  collectorSell: [
    {
      type: "modal",
      targetId: "",
      content: `Here you can set a price for the artwork you want to sell and offer it to the collector.`,
    },
    {
      type: "tip",
      targetId: "artValue",
      content: `Check the current value before you set a price.
      
      Don't sell yourself short!`,
    },
    {
      type: "tip",
      targetId: "askingInput",
      content: `Enter your asking price here.`,
    },
    {
      type: "tip",
      targetId: "askingButton",
      content: `When you're comfortable with the asking price, click this button to offer your artwork for sale.`,
    },
    {
      type: "tip",
      targetId: "npcDialogue",
      content: `The collector will respond to your offer here.`,
    },
  ],
  collectorSellSelect: [
    {
      type: "modal",
      targetId: "",
      content: `Here you can select one of the artworks from your portfolio and offer it for sale to the collector.`,
    },
    {
      type: "tip",
      targetId: "collectorSellList",
      content: `The artworks available to sell are listed here. 
      
      Only artworks in the current city are eligible unless you own a yacht.`,
    },
    {
      type: "tip",
      targetId: "collectorSellListItem",
      content: `Click on any of the available artworks to set a price and offer it for sale.`,
    },
  ],
  auctionList: [
    {
      type: "modal",
      targetId: "",
      content: `Every city has an auction house where you can buy and sell artworks on the public market.`,
    },
    {
      type: "tip",
      targetId: "auctionListTarget",
      content: `The artworks up for auction are listed here.`,
    },
    {
      type: "tip",
      targetId: "auctionListItem",
      content: `Click on any artwork to view more details and make a bid at the auction.`,
    },
    {
      type: "tip",
      targetId: "auctionSellButton",
      content: `Click here to select on of your own works to offer for sale at auction.`,
    },
  ],
  auctionBuy: [
    {
      type: "modal",
      targetId: "",
      content: `Here you can bid on works at auction.`,
    },
    {
      type: "tip",
      targetId: "artValue",
      content: `Check the value of the artwork to make sure you're getting a good deal`,
    },

    {
      type: "tip",
      targetId: "currentAsking",
      content: `The current asking price is shown here. This will be the amount you bid if you choose to place a bid.`,
    },

    {
      type: "tip",
      targetId: "placeBid",
      content: `If the current asking price seems like a good deal, click this button to bid that amount.`,
    },
    {
      type: "tip",
      targetId: "auctionMessages",
      content: `The results of your bid will be displayed here.
      
      If there are no higher bids, you win the auction and will own the artwork. It will be automatically stored in your portfolio in the current city.
      
      If someone else bids higher, you will be given a chance to bid again at a new, higher asking price.`,
    },
    {
      type: "tip",
      targetId: "giveUp",
      content: `If the price gets too high, click this button to concede the auction. The artwork will go into private ownership by the last highest (anonymous) bidder.`,
    },
  ],
  auctionSell: [
    {
      type: "modal",
      targetId: "",
      content: `Here you can sell your selected artwork at auction.`,
    },
    {
      type: "tip",
      targetId: "artValue",
      content: `Check the current value of the artwork before setting an asking price.`,
    },
    {
      type: "tip",
      targetId: "currentAsking",
      content: `A default value for the asking price is suggested at a slight discount 
      to the current value in order to encourage bids.`,
    },

    {
      type: "tip",
      targetId: "askingInput",
      content: `Enter a different value for the asking price here if you'd like to change it.
      This will be the minimum price to start the bidding.
      
      If you set it too high, you might find that nobody is interested in bidding.`,
    },

    {
      type: "tip",
      targetId: "startAuction",
      content: `When you're satisfied with the asking price, click here to start the auction.`,
    },

    {
      type: "tip",
      targetId: "auctionMessages",
      content: `The results of the auction will be displayed here.`,
    },
  ],
  auctionSellSelect: [
    {
      type: "modal",
      targetId: "",
      content: `Here you can select one of the artworks from your portfolio and offer it for sale at public auction.`,
    },
    {
      type: "tip",
      targetId: "auctionSellList",
      content: `The artworks available to sell are listed here.
      
      Only artworks in the current city are eligible unless you own a yacht.`,
    },
    {
      type: "tip",
      targetId: "auctionSellListItem",
      content: `Click on any of the available artworks to set a price and offer it for sale.`,
    },
  ],
  shopList: [],
  shopBuy: [],
};

export default TourSteps;
