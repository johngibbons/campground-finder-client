import { combineReducers } from "redux";
import campsiteFinders from "./campsiteFinders";
import campgrounds from "./campgrounds";
import users from "./users";

export const rootReducer = combineReducers({
  campgrounds,
  campsiteFinders,
  users
});
