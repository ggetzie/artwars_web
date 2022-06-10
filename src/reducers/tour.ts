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
  city: 0,
  portfolioList: 0,
  portfolioDetail: 0,
  portfolioConfirm: 0,
  collectorList: 0,
  collectorSellSelect: 0,
  collectorSell: 0,
  collectorBuy: 0,
  auctionList: 0,
  auctionSellSelect: 0,
  auctionSell: 0,
  auctionBuy: 0,
  shopList: 0,
  shopBuy: 0,
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
