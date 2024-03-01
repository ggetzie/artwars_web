import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface tourState {
  city: number;
  portfolioList: number;
  portfolioDetail: number;
  portfolioConfirm: number;
  collectorList: number;
  collectorSellSelect: number;
  collectorSell: number;
  collectorBuy: number;
  auctionList: number;
  auctionSellSelect: number;
  auctionSell: number;
  auctionBuy: number;
  shopList: number;
  shopBuy: number;
}

const initialState: tourState = {
  city: -1,
  portfolioList: -1,
  portfolioDetail: -1,
  portfolioConfirm: -1,
  collectorList: -1,
  collectorSellSelect: -1,
  collectorSell: -1,
  collectorBuy: -1,
  auctionList: -1,
  auctionSellSelect: -1,
  auctionSell: -1,
  auctionBuy: -1,
  shopList: -1,
  shopBuy: -1,
};
export type TourSection = keyof typeof initialState;
type TourIndex = [TourSection, number];

export const tourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {
    setIndex: (state, action: PayloadAction<TourIndex>) => {
      state[action.payload[0]] = action.payload[1];
    },
    incrementIndex: (state, action: PayloadAction<TourSection>) => {
      state[action.payload]++;
    },
    decrementIndex: (state, action: PayloadAction<TourSection>) => {
      state[action.payload]--;
    },
    resetTours: (state) => {
      for (const section in state) {
        state[section as TourSection] = 0;
      }
    },
    disableTours: (state) => {
      for (const section in state) {
        state[section as TourSection] = -1;
      }
    },
  },
});

export const {
  setIndex,
  incrementIndex,
  decrementIndex,
  resetTours,
  disableTours,
} = tourSlice.actions;

export const getIndex = (state: tourState, section: TourSection) => {
  return state[section];
};

export default tourSlice.reducer;
