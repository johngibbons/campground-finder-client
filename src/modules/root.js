import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'
import campsiteFinders, {
  createCampsiteFinderEpic,
  updateCampsiteFinderEpic,
  fetchAllCampsiteFindersEpic
} from './campsiteFinders'
import campgrounds, { queryCampgroundsEpic } from './campgrounds'

export const rootEpic = combineEpics(
  createCampsiteFinderEpic,
  updateCampsiteFinderEpic,
  fetchAllCampsiteFindersEpic,
  queryCampgroundsEpic
)

export const rootReducer = combineReducers({
  campgrounds,
  campsiteFinders
})
