import { combineReducers } from "redux";
import { createSelector } from "reselect";
import { mapObjsToIds, renameKeys } from "../helpers/reducerHelpers";
import { take, compose, pick, map, path, keys, project } from "ramda";
import { ajax } from "rxjs/observable/dom/ajax";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
import {
  FETCH_ALL_FULFILLED,
  campsiteFinderListSchema,
} from "./campsiteFinders";
import { normalize, schema } from "normalizr";

export const campgroundSchema = new schema.Entity(
  "campgrounds",
  {},
  { idAttribute: "_id" }
);

const campgroundListSchema = [campgroundSchema];

// CONSTANTS
const QUERY = "campground-finder/campgrounds/QUERY";
const QUERY_FULFILLED = "campground-finder/campgrounds/QUERY_FULFILLED";

// REDUCERS
const attrs = [
  "_id",
  "facilityName",
  "placeName",
  "facilityId",
  "facilityPhoto",
  "latitude",
  "longitude",
  "regionName",
  "shortName",
  "state",
];

function queryIds(state = [], action = {}) {
  switch (action.type) {
    case QUERY_FULFILLED: {
      return action.campgrounds.map((campgrounds) => campgrounds._id);
    }
    default:
      return state;
  }
}

function ids(state = [], action = {}) {
  switch (action.type) {
    case QUERY_FULFILLED: {
      return [
        ...state,
        ...action.campgrounds.map((campgrounds) => campgrounds._id),
      ];
    }
    case FETCH_ALL_FULFILLED: {
      const normalized = normalize(
        action.campsiteFinders,
        campsiteFinderListSchema
      );
      return keys(path(["entities", "campgrounds"], normalized)) || state;
    }
    default:
      return state;
  }
}

function objs(state = {}, action = {}) {
  switch (action.type) {
    case QUERY_FULFILLED: {
      const normalized = normalize(
        compose(project(attrs))(action.campgrounds),
        campgroundListSchema
      );
      const campgrounds = path(["entities", "campgrounds"], normalized);
      return { ...state, ...campgrounds };
    }
    case FETCH_ALL_FULFILLED: {
      const normalized = normalize(
        action.campsiteFinders,
        campsiteFinderListSchema
      );
      return path(["entities", "campgrounds"], normalized) || state;
    }
    default:
      return state;
  }
}

export default combineReducers({
  queryIds,
  ids,
  objs,
});

// ACTION CREATORS
export function queryCampgrounds(query) {
  return {
    type: QUERY,
    query,
  };
}

function queryFulfilled(campgrounds) {
  return {
    type: QUERY_FULFILLED,
    campgrounds,
  };
}

// SELECTORS
const campgroundObjsSelector = (state) => state.campgrounds.objs;
const campgroundIdsSelector = (state) => state.campgrounds.ids;
const campgroundQueryIdsSelector = (state) => state.campgrounds.queryIds;
const raKeysMap = {
  facilityId: "key",
  placeName: "text",
  _id: "value",
  state: "description",
};
const rcaKeysMap = {
  facilityId: "key",
  placeName: "text",
  _id: "value",
  facilityName: "description",
};

const keysFilter = ["key", "text", "value", "description"];

const mapToOptions = (objs) => {
  return objs.map((obj) =>
    obj.facilityName
      ? compose(
          pick(keysFilter),
          renameKeys(rcaKeysMap)
        )(obj)
      : compose(
          pick(keysFilter),
          renameKeys(raKeysMap)
        )(obj)
  );
};

export const campgroundsSelector = createSelector(
  campgroundObjsSelector,
  campgroundIdsSelector,
  mapObjsToIds
);

export const campgroundResultsSelector = createSelector(
  campgroundObjsSelector,
  campgroundQueryIdsSelector,
  mapObjsToIds
);

export const campgroundOptionsSelector = createSelector(
  campgroundResultsSelector,
  mapToOptions
);

// EPICS
const base = process.env.REACT_APP_HOST;

export const queryCampgroundsEpic = (action$) =>
  action$
    .ofType(QUERY)
    .filter((action) => action.query && action.query.length > 3)
    .mergeMap((action) =>
      ajax
        .getJSON(`${base}/campgrounds?q=${action.query}`)
        .map((response) => queryFulfilled(response))
    );
