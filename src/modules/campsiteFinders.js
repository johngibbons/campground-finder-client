import { combineReducers } from 'redux'
import { createSelector } from 'reselect'
import { updateObjectValue, toggleObjectValue } from '../helpers/reducerHelpers'
import {
  path,
  pick,
  without,
  omit,
  sortBy,
  prop,
  reverse,
  compose
} from 'ramda'
import { ajax } from 'rxjs/observable/dom/ajax'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
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
const DELETE = 'campground-finder/campsite-finders/DELETE'
const DELETE_FULFILLED = 'campground-finder/campsite-finders/DELETE_FULFILLED'
export const CREATE_FULFILLED =
  'campground-finder/campsite-finders/CREATE_FULFILLED'
const UPDATE = 'campground-finder/campsite-finders/UPDATE'
export const UPDATE_FULFILLED =
  'campground-finder/campsite-finders/UPDATE_FULFILLED'
const SET_EMAIL_VALUE = 'campground-finder/campsite-finders/SET_EMAIL_VALUE'
const SET_DATE_FOCUS = 'campground-finder/campsite-finders/SET_DATE_FOCUS'
const TOGGLE_CONFIRM_MODAL =
  'campground-finder/campsite-finders/TOGGLE_CONFIRM_MODAL'
const TOGGLE_SHOW_ALL_RESULTS =
  'campground-finder/campsite-finders/TOGGLE_SHOW_ALL_RESULTS'

export const NEXT_SIX_MONTHS = 'NEXT_SIX_MONTHS'
export const SPECIFIC_DATES = 'SPECIFIC_DATES'
export const START_DATE = 'startDate'
export const END_DATE = 'endDate'

const attrs = [
  '_id',
  'campgroundId',
  'isActive',
  'isWeekendsOnly',
  'isSendingEmails',
  'emailAddresses',
  'datesAvailable',
  'dateOption',
  'startDate',
  'endDate',
  'lastCheckedAt'
]

function ids (state = [], action = {}) {
  switch (action.type) {
    case CREATE_FULFILLED: {
      return [...state, action.campsiteFinder._id]
    }
    case FETCH_ALL_FULFILLED: {
      return action.campsiteFinders.map(campsiteFinder => campsiteFinder._id)
    }
    case DELETE_FULFILLED: {
      return without(action.id, state)
    }
    default:
      return state
  }
}

function objs (state = {}, action = {}) {
  const updateObj = updateObjectValue(action.id)
  const toggleObj = toggleObjectValue(action.id)

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
    case DELETE_FULFILLED: {
      return omit(action.id, state)
    }
    case SET_DATE_FOCUS: {
      return updateObj('focusedDate', action.focusedDate, state)
    }
    case SET_EMAIL_VALUE: {
      return updateObj('emailValue', action.value, state)
    }
    case TOGGLE_CONFIRM_MODAL: {
      return toggleObj('isConfirmOpen', state)
    }
    case TOGGLE_SHOW_ALL_RESULTS: {
      return toggleObj('isShowingAllResults', state)
    }
    default:
      return state
  }
}

function ui (state = { isLoaded: false }, action = {}) {
  switch (action.type) {
    case FETCH_ALL_FULFILLED: {
      return { ...state, isLoaded: true }
    }
    default:
      return state
  }
}

export default combineReducers({
  ids,
  objs,
  ui
})

// ACTION CREATORS

export function setDateFocus (id, focusedDate) {
  return {
    type: SET_DATE_FOCUS,
    id,
    focusedDate
  }
}

export function setEmailValue (id, value) {
  return {
    type: SET_EMAIL_VALUE,
    id,
    value
  }
}

export function toggleConfirmModal (id) {
  return {
    type: TOGGLE_CONFIRM_MODAL,
    id
  }
}

export function toggleShowAllResults (id) {
  return {
    type: TOGGLE_SHOW_ALL_RESULTS,
    id
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

export function deleteCampsiteFinder (id) {
  return {
    type: DELETE,
    id
  }
}

function deleteCampsiteFinderFulfilled (id) {
  return {
    type: DELETE_FULFILLED,
    id
  }
}

// SELECTORS
const campsiteFinderObjsSelector = state => state.campsiteFinders.objs
const campsiteFinderIdsSelector = state => state.campsiteFinders.ids
const campgroundObjsSelector = state => state.campgrounds.objs
export const isFindersCollectionLoadedSelector = state =>
  state.campsiteFinders.ui.isLoaded
const sortByCreatedAt = compose(reverse, sortBy(prop('createdAt')))

export const campsiteFindersSelector = createSelector(
  campsiteFinderObjsSelector,
  campsiteFinderIdsSelector,
  campgroundObjsSelector,
  (cfObjs, cfIds, cgObjs) => {
    return sortByCreatedAt(
      denormalize(cfIds, campsiteFinderListSchema, {
        campgrounds: cgObjs,
        campsiteFinders: cfObjs
      })
    )
  }
)

// EPICS
const base = process.env.REACT_APP_HOST

export const fetchAllCampsiteFindersEpic = action$ =>
  action$
    .ofType(FETCH_ALL)
    .mergeMap(action =>
      ajax
        .getJSON(`${base}/campsite-finders`)
        .map(response => fetchAllFulfilled(response))
        .catch(err => console.log(err))
    )

export const createCampsiteFinderEpic = action$ =>
  action$.ofType(CREATE).mergeMap(action =>
    ajax({
      url: `${base}/campsite-finders`,
      body: action.params,
      method: 'POST',
      responseType: 'json'
    })
      .map(response => createCampsiteFinderFulfilled(response.response))
      .catch(err => console.log(err))
  )

export const updateCampsiteFinderEpic = action$ =>
  action$.ofType(UPDATE).mergeMap(action =>
    ajax({
      url: `${base}/campsite-finders/${action.id}`,
      body: action.params,
      method: 'PUT',
      responseType: 'json'
    })
      .map(response => updateCampsiteFinderFulfilled(response.response))
      .catch(err => console.log(err))
  )

export const deleteCampsiteFinderEpic = action$ =>
  action$.ofType(DELETE).mergeMap(action =>
    ajax({
      url: `${base}/campsite-finders/${action.id}`,
      method: 'DELETE',
      responseType: 'json'
    })
      .map(() => deleteCampsiteFinderFulfilled(action.id))
      .catch(err => console.log(err))
  )
