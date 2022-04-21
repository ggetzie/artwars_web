import {combineReducers} from "redux";
import gameReducer from "./game";
import headerReducer from "./header";
import settingsReducer from "./settings";

export default combineReducers({
  game: gameReducer,
  settings: settingsReducer,
  header: headerReducer,
});
