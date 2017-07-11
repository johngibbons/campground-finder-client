import { combineReducers } from 'redux'
import { createSelector } from 'reselect'
import { toggleObjectValue, updateObjectValue } from '../helpers/reducerHelpers'
import { compose } from 'ramda'
import moment from 'moment'

const SELET_DATE_OPTIION = 'campground-finder/campgrounds/SELET_DATE_OPTIION'
const TOGGLE_WEEKENDS = 'campground-finder/campgrounds/TOGGLE_WEEKENDS'
const TOGGLE_ACTIVE = 'campground-finder/campgrounds/TOGGLE_ACTIVE'
const SET_DATES = 'campground-finder/campgrounds/SET_DATES'
const SET_DATE_FOCUS = 'campground-finder/campgrounds/SET_DATE_FOCUS'

export const NEXT_SIX_MONTHS = 'campground-finder/campgrounds/NEXT_SIX_MONTHS'
export const SPECIFIC_DATES = 'campground-finder/campgrounds/SPECIFIC_DATES'
export const START_DATE = 'startDate'
export const END_DATE = 'endDate'

const sampleIds = [1, 2]
const sampleObjs = {
  1: {
    id: 1,
    active: true,
    title: 'Big Basin',
    weekends: false,
    dateOption: SPECIFIC_DATES,
    startDate: moment(),
    endDate: moment().add(4, 'months'),
    focusedDate: null
  },
  2: {
    id: 2,
    active: false,
    title: 'Steep Ravine',
    weekends: true,
    dateOption: NEXT_SIX_MONTHS,
    focusedDate: null
  }
}

function ids (state = sampleIds, action = {}) {
  switch (action.type) {
    default:
      return state
  }
}

function objs (state = sampleObjs, action = {}) {
  const toggleVal = toggleObjectValue(action.id)
  const updateObj = updateObjectValue(action.id)

  switch (action.type) {
    case TOGGLE_WEEKENDS: {
      return toggleVal('weekends', state)
    }
    case TOGGLE_ACTIVE: {
      return toggleVal('active', state)
    }
    case SELET_DATE_OPTIION: {
      return updateObj('dateOption', action.dateOption, state)
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

export function selectDateOption (id, dateOption) {
  return {
    type: SELET_DATE_OPTIION,
    id,
    dateOption
  }
}

export function toggleWeekends (id) {
  return {
    type: TOGGLE_WEEKENDS,
    id
  }
}

export function toggleActive (id) {
  return {
    type: TOGGLE_ACTIVE,
    id
  }
}

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

const campgroundObjsSelector = state => state.campgrounds.objs
const campgroundIdsSelector = state => state.campgrounds.ids

export const campgroundsSelector = createSelector(
  campgroundObjsSelector,
  campgroundIdsSelector,
  (objs, ids) => ids.map(id => objs[id])
)
