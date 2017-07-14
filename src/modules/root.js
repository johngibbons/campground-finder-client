import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'
import campsiteFinders, {
  createCampsiteFinderEpic,
  updateCampsiteFinderEpic,
  deleteCampsiteFinderEpic,
  fetchAllCampsiteFindersEpic
} from './campsiteFinders'
import campgrounds, { queryCampgroundsEpic } from './campgrounds'

export const rootEpic = combineEpics(
  createCampsiteFinderEpic,
  updateCampsiteFinderEpic,
  deleteCampsiteFinderEpic,
  fetchAllCampsiteFindersEpic,
  queryCampgroundsEpic
)

export const rootReducer = combineReducers({
  campgrounds,
  campsiteFinders
})
