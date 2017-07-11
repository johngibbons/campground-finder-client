import { connect } from 'react-redux'
import {
  selectDateOption,
  toggleActive,
  toggleWeekends,
  setDates,
  setDateFocus
} from '../modules/campgrounds'
import CampgroundCard from '../components/campground-card'

export default connect(null, {
  handleSelectDateOption: selectDateOption,
  handleToggleActive: toggleActive,
  handleToggleWeekends: toggleWeekends,
  handleSetDates: setDates,
  handleDateFocusChange: setDateFocus
})(CampgroundCard)
