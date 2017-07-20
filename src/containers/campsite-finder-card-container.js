import { connect } from 'react-redux'
import {
  updateCampsiteFinder,
  deleteCampsiteFinder,
  toggleConfirmModal,
  toggleSettingsFormShowing,
  toggleShowAllResults,
  cancelEditSettings
} from '../modules/campsiteFinders'
import CampsiteFinderCard from '../components/campsite-finder-card.js'

export default connect(null, {
  handleUpdateCampsiteFinder: updateCampsiteFinder,
  handleDeleteCampsiteFinder: deleteCampsiteFinder,
  handleToggleConfirm: toggleConfirmModal,
  handleToggleSettigsFormShowing: toggleSettingsFormShowing,
  handleToggleShowAllResults: toggleShowAllResults,
  handleCancelEditSettings: cancelEditSettings
})(CampsiteFinderCard)
