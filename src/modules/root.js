import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";
import campsiteFinders, {
  createCampsiteFinderEpic,
  updateCampsiteFinderEpic,
  deleteCampsiteFinderEpic,
  fetchAllCampsiteFindersEpic
} from "./campsiteFinders";
import campgrounds, { queryCampgroundsEpic } from "./campgrounds";
import users, { createUserEpic } from "./users";

export const rootEpic = combineEpics(
  createCampsiteFinderEpic,
  updateCampsiteFinderEpic,
  deleteCampsiteFinderEpic,
  fetchAllCampsiteFindersEpic,
  queryCampgroundsEpic,
  createUserEpic
);

export const rootReducer = combineReducers({
  campgrounds,
  campsiteFinders,
  users
});
