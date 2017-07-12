import { connect } from 'react-redux'
import {
  updateCampsiteFinder,
  setDates,
  setDateFocus
} from '../modules/campsiteFinders'
import CampsiteFinderCard from '../components/campsite-finder-card.js'

export default connect(null, {
  handleUpdateCampsiteFinder: updateCampsiteFinder,
  handleSetDates: setDates,
  handleDateFocusChange: setDateFocus
})(CampsiteFinderCard)
