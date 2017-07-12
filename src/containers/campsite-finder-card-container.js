import { connect } from 'react-redux'
import {
  updateCampsiteFinder,
  setEmailValue,
  setDateFocus
} from '../modules/campsiteFinders'
import CampsiteFinderCard from '../components/campsite-finder-card.js'

export default connect(null, {
  handleUpdateCampsiteFinder: updateCampsiteFinder,
  handleSetEmailValue: setEmailValue,
  handleDateFocusChange: setDateFocus
})(CampsiteFinderCard)
