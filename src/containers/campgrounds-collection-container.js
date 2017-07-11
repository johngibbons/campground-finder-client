import { connect } from 'react-redux'
import { campgroundsSelector } from '../modules/campgrounds'
import CampgroundsCollection from '../components/campgrounds-collection'

const mapStateToProps = state => {
  return {
    campgrounds: campgroundsSelector(state)
  }
}

export default connect(mapStateToProps)(CampgroundsCollection)
