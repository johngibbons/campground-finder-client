import { connect } from 'react-redux'
import {
  updateCampsiteFinder,
  deleteCampsiteFinder,
  setEmailValue,
  setDateFocus,
  toggleConfirmModal,
  toggleShowAllResults
} from '../modules/campsiteFinders'
import CampsiteFinderCard from '../components/campsite-finder-card.js'

export default connect(null, {
  handleUpdateCampsiteFinder: updateCampsiteFinder,
  handleDeleteCampsiteFinder: deleteCampsiteFinder,
  handleSetEmailValue: setEmailValue,
  handleDateFocusChange: setDateFocus,
  handleToggleConfirm: toggleConfirmModal,
  handleToggleShowAllResults: toggleShowAllResults
})(CampsiteFinderCard)
