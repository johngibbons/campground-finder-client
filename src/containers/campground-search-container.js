import { connect } from 'react-redux'
import {
  campgroundResultsSelector,
  campgroundOptionsSelector,
  queryCampgrounds
} from '../modules/campgrounds'
import { createCampsiteFinder } from '../modules/campsiteFinders'
import CampgroundSearch from '../components/campground-search'

const mapStateToProps = state => {
  return {
    query: state.campgrounds.query,
    campgrounds: campgroundResultsSelector(state),
    options: campgroundOptionsSelector(state)
  }
}

export default connect(mapStateToProps, {
  handleQueryCampgrounds: queryCampgrounds,
  handleCreateCampsiteFinder: createCampsiteFinder
})(CampgroundSearch)
