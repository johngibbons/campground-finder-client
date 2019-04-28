import { routerMiddleware } from "react-router-redux";
import { createBrowserHistory } from "history";
import { configureStore, getDefaultMiddleware } from "redux-starter-kit";
import campgrounds from "./modules/campgrounds";
import campsiteFinders from "./modules/campsiteFinders";
import createCampsiteFinder from "./modules/createCampsiteFinder";
import users from "./modules/users";

export const history = createBrowserHistory();

const enhancers = [];

if (process.env.NODE_ENV === "development") {
  const devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
}

const store = configureStore({
  reducer: { campgrounds, campsiteFinders, createCampsiteFinder, users },
  middleware: [...getDefaultMiddleware(), routerMiddleware(history)],
  enhancers
});

export default store;
