import { combineReducers } from 'redux'
import { createSelector } from 'reselect'
import { updateObjectValue } from '../helpers/reducerHelpers'
import { compose, path, pick } from 'ramda'
import { ajax } from 'rxjs/observable/dom/ajax'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import { normalize, denormalize, schema } from 'normalizr'
import { campgroundSchema } from './campgrounds'

const campsiteFinderSchema = new schema.Entity(
  'campsiteFinders',
  {
    campgroundId: campgroundSchema
  },
  { idAttribute: '_id' }
)
export const campsiteFinderListSchema = [campsiteFinderSchema]

const FETCH_ALL = 'campground-finder/campsite-finders/FETCH_ALL'
export const FETCH_ALL_FULFILLED =
  'campground-finder/campsite-finders/FETCH_ALL_FULFILLED'
const CREATE = 'campground-finder/campsite-finders/CREATE'
export const CREATE_FULFILLED =
  'campground-finder/campsite-finders/CREATE_FULFILLED'
const UPDATE = 'campground-finder/campsite-finders/UPDATE'
export const UPDATE_FULFILLED =
  'campground-finder/campsite-finders/UPDATE_FULFILLED'
const SET_DATES = 'campground-finder/campsite-finders/SET_DATES'
const SET_DATE_FOCUS = 'campground-finder/campsite-finders/SET_DATE_FOCUS'

export const NEXT_SIX_MONTHS = 'NEXT_SIX_MONTHS'
export const SPECIFIC_DATES = 'SPECIFIC_DATES'
export const START_DATE = 'startDate'
export const END_DATE = 'endDate'

const attrs = [
  '_id',
  'campgroundId',
  'isActive',
  'isWeekendsOnly',
  'dateOption',
  'startDate',
  'endDate'
]

function ids (state = [], action = {}) {
  switch (action.type) {
    case CREATE_FULFILLED: {
      return [...state, action.campsiteFinder._id]
    }
    case FETCH_ALL_FULFILLED: {
      return action.campsiteFinders.map(campsiteFinder => campsiteFinder._id)
    }
    default:
      return state
  }
}

function objs (state = {}, action = {}) {
  const updateObj = updateObjectValue(action.id)

  switch (action.type) {
    case FETCH_ALL_FULFILLED: {
      const normalized = normalize(
        action.campsiteFinders,
        campsiteFinderListSchema
      )
      const campsiteFinders = path(['entities', 'campsiteFinders'], normalized)
      return campsiteFinders || state
    }
    case UPDATE_FULFILLED:
    case CREATE_FULFILLED: {
      return {
        ...state,
        [action.campsiteFinder._id]: pick(attrs, action.campsiteFinder)
      }
    }
    case SET_DATES: {
      return compose(
        updateObj('startDate', action.startDate),
        updateObj('endDate', action.endDate)
      )(state)
    }
    case SET_DATE_FOCUS: {
      return updateObj('focusedDate', action.focusedDate, state)
    }
    default:
      return state
  }
}

export default combineReducers({
  ids,
  objs
})

// ACTION CREATORS

export function setDates (id, startDate, endDate) {
  return {
    type: SET_DATES,
    id,
    startDate,
    endDate
  }
}

export function setDateFocus (id, focusedDate) {
  return {
    type: SET_DATE_FOCUS,
    id,
    focusedDate
  }
}

export function createCampsiteFinder (params) {
  return {
    type: CREATE,
    params
  }
}

export function createCampsiteFinderFulfilled (campsiteFinder) {
  return {
    type: CREATE_FULFILLED,
    campsiteFinder
  }
}

export function fetchAllCampsiteFinders () {
  return {
    type: FETCH_ALL
  }
}

function fetchAllFulfilled (campsiteFinders) {
  return {
    type: FETCH_ALL_FULFILLED,
    campsiteFinders
  }
}

export function updateCampsiteFinder (id, params) {
  console.log(id)
  return {
    type: UPDATE,
    id,
    params
  }
}

function updateCampsiteFinderFulfilled (campsiteFinder) {
  return {
    type: UPDATE_FULFILLED,
    campsiteFinder
  }
}

// SELECTORS
const campsiteFinderObjsSelector = state => state.campsiteFinders.objs
const campsiteFinderIdsSelector = state => state.campsiteFinders.ids
const campgroundObjsSelector = state => state.campgrounds.objs

export const campsiteFindersSelector = createSelector(
  campsiteFinderObjsSelector,
  campsiteFinderIdsSelector,
  campgroundObjsSelector,
  (cfObjs, cfIds, cgObjs) => {
    return denormalize(cfIds, campsiteFinderListSchema, {
      campgrounds: cgObjs,
      campsiteFinders: cfObjs
    })
  }
)

// EPICS
const base = 'http://localhost:8080'

export const fetchAllCampsiteFindersEpic = action$ =>
  action$
    .ofType(FETCH_ALL)
    .mergeMap(action =>
      ajax
        .getJSON(`${base}/campsite-finders`)
        .map(response => fetchAllFulfilled(response))
    )

export const createCampsiteFinderEpic = action$ =>
  action$.ofType(CREATE).mergeMap(action =>
    ajax({
      url: `${base}/campsite-finders`,
      body: action.params,
      method: 'POST',
      responseType: 'json'
    }).map(response => createCampsiteFinderFulfilled(response.response))
  )

export const updateCampsiteFinderEpic = action$ =>
  action$.ofType(UPDATE).mergeMap(action =>
    ajax({
      url: `${base}/campsite-finders/${action.id}`,
      body: action.params,
      method: 'PUT',
      responseType: 'json'
    }).map(response => updateCampsiteFinderFulfilled(response.response))
  )
