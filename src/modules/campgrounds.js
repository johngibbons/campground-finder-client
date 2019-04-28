import { combineReducers } from "redux";
import { createSelector } from "reselect";
import {
  mapObjsToIds,
  renameKeys,
  setToCapitalize
} from "../helpers/reducerHelpers";
import { take, compose, pick, map, path, keys, project } from "ramda";
import {
  FETCH_ALL_FULFILLED,
  campsiteFinderListSchema
} from "./campsiteFinders";
import { normalize, schema } from "normalizr";

export const campgroundSchema = new schema.Entity(
  "campgrounds",
  {},
  { idAttribute: "_id" }
);

const campgroundListSchema = [campgroundSchema];

// CONSTANTS
const QUERY_FULFILLED = "campground-finder/campgrounds/QUERY_FULFILLED";

// REDUCERS
const attrs = [
  "_id",
  "secondaryName",
  "name",
  "facilityId",
  "image",
  "latitude",
  "longitude",
  "state"
];

function queryIds(state = [], action = {}) {
  switch (action.type) {
    case QUERY_FULFILLED: {
      return action.campgrounds.map(campgrounds => campgrounds._id);
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
        ...action.campgrounds.map(campgrounds => campgrounds._id)
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
        compose(
          map(setToCapitalize("name")),
          project(attrs)
        )(action.campgrounds),
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
  objs
});

function queryFulfilled(campgrounds) {
  return {
    type: QUERY_FULFILLED,
    campgrounds
  };
}

// SELECTORS
const campgroundObjsSelector = state => state.campgrounds.objs;
const campgroundIdsSelector = state => state.campgrounds.ids;
const searchResultsCampgrounds = state => state.campgrounds.queryIds;

const mapToOptions = objs => {
  return objs.map(({ name, secondaryName, _id }) => {
    return {
      key: _id,
      text: name,
      value: _id,
      description: secondaryName
    };
  });
};

export const campgroundsSelector = createSelector(
  campgroundObjsSelector,
  campgroundIdsSelector,
  mapObjsToIds
);

export const campgroundResultsSelector = createSelector(
  campgroundObjsSelector,
  searchResultsCampgrounds,
  mapObjsToIds
);

export const campgroundOptionsSelector = createSelector(
  campgroundResultsSelector,
  mapToOptions
);

// THUNKS
const base = process.env.REACT_APP_HOST;

export function queryCampgrounds(query) {
  return async dispatch => {
    if (query.length < 3) {
      return;
    }
    const response = await fetch(`${base}/campgrounds?q=${query}`);

    if (response.ok) {
      const campgrounds = await response.json();
      return dispatch(queryFulfilled(campgrounds));
    }
  };
}
