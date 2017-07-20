import { connect } from 'react-redux'
import {
  updateCampsiteFinder,
  deleteCampsiteFinder,
  setEmailValue,
  setSiteCodeValue,
  setDateOption,
  setDateFocus,
  toggleConfirmModal,
  toggleSettingsFormShowing,
  toggleShowAllResults,
  toggleIsWeekendsOnly
} from '../modules/campsiteFinders'
import CampsiteFinderCard from '../components/campsite-finder-card.js'

export default connect(null, {
  handleUpdateCampsiteFinder: updateCampsiteFinder,
  handleDeleteCampsiteFinder: deleteCampsiteFinder,
  handleSetEmailValue: setEmailValue,
  handleSetSiteCodeValue: setSiteCodeValue,
  handleSetDateOption: setDateOption,
  handleDateFocusChange: setDateFocus,
  handleToggleConfirm: toggleConfirmModal,
  handleToggleSettigsFormShowing: toggleSettingsFormShowing,
  handleToggleShowAllResults: toggleShowAllResults,
  handleToggleIsWeekendsOnly: toggleIsWeekendsOnly
})(CampsiteFinderCard)
