import { connect } from 'react-redux'
import { selectDateOption, toggleActive } from '../modules/campgrounds'
import CampgroundCard from '../components/campground-card'

export default connect(null, {
  handleSelectDateOption: selectDateOption,
  handleToggleActive: toggleActive
})(CampgroundCard)
