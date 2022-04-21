import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface headingState {
  showBack: boolean;
  title: string;
}

const initialState: headingState = {
  showBack: false,
  title: "Art Wars",
};

export const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    setShowBack: (state, action: PayloadAction<boolean>) => {
      state.showBack = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
  },
});

export const {setShowBack, setTitle} = headerSlice.actions;

export const getShowBack = (state: headingState) => {
  return state.showBack;
};

export const getTitle = (state: headingState) => {
  return state.title;
};

export default headerSlice.reducer;
