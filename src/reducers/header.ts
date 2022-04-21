import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface headingState {
  showBack: boolean;
}

const initialState: headingState = {
  showBack: false,
};

export const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    setShowBack: (state, action: PayloadAction<boolean>) => {
      state.showBack = action.payload;
    },
  },
});

export const {setShowBack} = headerSlice.actions;

export const getShowBack = (state: headingState) => {
  return state.showBack;
};

export default headerSlice.reducer;
