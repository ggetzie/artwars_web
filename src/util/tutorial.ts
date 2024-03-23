import {TutorialData} from "./types";

export const Tutorial: TutorialData = {
  1: {
    description: "Buy an artwork from a collector",
    steps: [
      {
        displayText: `Hello and welcome to the tutorial. 
        In Art Wars you can buy and sell art to and from collectors and auction houses.
        In this first level of the tutorial, we'll buy an artwork from a collector.
        click on the collector icon below.`,
        documentation: `Display a welcome message in a modal. 
          Highlight the collector icon. 
          Move to the next step when the user clicks on the collector icon.`,
      },
      {
        displayText: `Every city has a resident art collector. 
        Each collector has a preference for a specific type of art. 
        They will pay more for their preferred art, but they will also demand a higher price when they sell it.
        Scroll through the list of the collector's art for sale to find a piece to purchase. 
        Check your available cash to make sure you have enough.
        `,
        documentation: `Display a message in a modal. 
          Highlight the collector's preferred art style. 
          Highlight the cash balance.
          Highlight the art for sale. Animate an arrow to show the user to scroll down.
          Move to the next step when the user selects an artwork.`,
      },
      {
        displayText: `To make an offer on this artwork, 
        enter the amount in the text box and click "Make Offer".
        Try to offer a little less than the asking price to see if the collector will accept.`,
        documentation: `Display the message in a modal.
        Highlight the offer input field and the Make Offer button.
        Move to the next step when the user makes an offer.`,
      },
      {
        displayText: `Congratulations! You just bought your first artwork.
      Click on the portfolio button to view the artwork you own.`,
        documentation: `Display message in a modal. 
      Move to the next step when the user clicks on the portfolio button.
      Make a note of which artwork the user bought in the tutorial state.`,
      },
      {
        displayText: `This screen is where you can view all the art you own.
        Each artwork resides in the city where you bought it. 
        It doesn't make sense to sell the artwork back to the collector you bought it from,
        so we'll need to move to a different city to sell it.
        Click on the city icon below to go back to to the city screen and select a new city.`,
        documentation: `Display message in a modal. 
        Highlight the artwork list for the city. 
        Highlight the city button.`,
      },
      {
        displayText: `Moving to a new city ends the current turn. 
        Select a new city from the drop down list to complete this level of the tutorial.`,
        documentation: `Display message in a modal. 
        Move to the next step when the user clicks selects a new city.`,
      },
    ],
  },
  2: {
    description: "Sell an artwork to a collector",
    steps: [
      {
        displayText: `Good job! Welcome to level 2 of the tutorial. `,
        documentation: `The current hot category should be the same 
        as the category of the artwork the user bought in the first level.`,
      },
      {displayText: "Click on the collector icon below", documentation: ""},
      {displayText: "Select an artwork", documentation: ""},
    ],
  },
  3: {
    description: "Buy an artwork from a gallery",
    steps: [
      {displayText: "Hello and welcome to the tutorial", documentation: ""},
      {displayText: "Click on the gallery icon below", documentation: ""},
      {displayText: "Select an artwork", documentation: ""},
    ],
  },
  4: {
    description: "Sell an artwork to a gallery",
    steps: [
      {displayText: "Hello and welcome to the tutorial", documentation: ""},
      {displayText: "Click on the gallery icon below", documentation: ""},
      {displayText: "Select an artwork", documentation: ""},
    ],
  },
  5: {
    description: "Buy an artwork from an auction",
    steps: [
      {displayText: "Hello and welcome to the tutorial", documentation: ""},
      {displayText: "Click on the auction icon below", documentation: ""},
      {displayText: "Select an artwork", documentation: ""},
    ],
  },
  6: {
    description: "Sell an artwork to an auction",
    steps: [
      {displayText: "Hello and welcome to the tutorial", documentation: ""},
      {displayText: "Click on the auction icon below", documentation: ""},
      {displayText: "Select an artwork", documentation: ""},
    ],
  },
  7: {
    description: "Buy an artwork from a museum",
    steps: [
      {displayText: "Hello and welcome to the tutorial", documentation: ""},
      {displayText: "Click on the museum icon below", documentation: ""},
      {displayText: "Select an artwork", documentation: ""},
    ],
  },
  8: {
    description: "Sell an artwork to a museum",
    steps: [
      {displayText: "Hello and welcome to the tutorial", documentation: ""},
      {displayText: "Click on the museum icon below", documentation: ""},
      {displayText: "Select an artwork", documentation: ""},
    ],
  },
  9: {
    description: "Buy an artwork from a collector",
    steps: [
      {displayText: "Hello and welcome to the tutorial", documentation: ""},
      {displayText: "Click on the collector icon below", documentation: ""},
      {displayText: "Select an artwork", documentation: ""},
    ],
  },
  9999: {
    description: "End of tutorial",
    steps: [
      {
        displayText: "",
        documentation: "When level is 9999 the tutorial will not be displayed.",
      },
    ],
  },
};
