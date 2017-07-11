import { combineReducers } from 'redux'
import { createSelector } from 'reselect'
import { updateObjectValue, toggleObjectValue } from '../helpers/reducerHelpers'

const FETCH = 'campground-finder/campgrounds/FETCH'
const SELECT_DATE_OPTION = 'campground-finder/campgrounds/SELECT_DATE_OPTION'
const TOGGLE_ACTIVE = 'campground-finder/campgrounds/TOGGLE_ACTIVE'
export const ALL_WEEKENDS = 'campground-finder/campgrounds/ALL_WEEKENDS'
export const SPECIFIC_DATES = 'campground-finder/campgrounds/SPECIFIC_DATES'

const sampleIds = [1, 2]
const sampleObjs = {
  1: {
    id: 1,
    active: true,
    title: 'Big Basin',
    dateOption: ALL_WEEKENDS
  },
  2: {
    id: 2,
    active: false,
    title: 'Steep Ravine',
    dateOption: SPECIFIC_DATES
  }
}

function ids (state = sampleIds, action = {}) {
  switch (action.type) {
    default:
      return state
  }
}

function objs (state = sampleObjs, action = {}) {
  const updateObj = updateObjectValue(action.id)

  switch (action.type) {
    case SELECT_DATE_OPTION: {
      const updateDateOption = updateObj('dateOption', action.dateOption)
      return updateDateOption(state)
    }
    case TOGGLE_ACTIVE: {
      const toggleActive = toggleObjectValue(action.id, 'active')
      return toggleActive(state)
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
    type: SELECT_DATE_OPTION,
    id,
    dateOption
  }
}

export function toggleActive (id) {
  return {
    type: TOGGLE_ACTIVE,
    id
  }
}

const campgroundObjsSelector = state => state.campgrounds.objs
const campgroundIdsSelector = state => state.campgrounds.ids

export const campgroundsSelector = createSelector(
  campgroundObjsSelector,
  campgroundIdsSelector,
  (objs, ids) => ids.map(id => objs[id])
)
