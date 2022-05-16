import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import gameReducer from "./reducers/game";
import settingsReducer from "./reducers/settings";
import headerReducer from "./reducers/header";
import tourReducer from "./reducers/tour";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    settings: settingsReducer,
    header: headerReducer,
    tour: tourReducer,
  },
  middleware: getDefaultMiddleware({serializableCheck: false}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
