import { connect } from "react-redux";
import {
  campgroundOptionsSelector,
  queryCampgrounds
} from "../modules/campgrounds";
import CampgroundSearch from "../components/campground-search";

const mapStateToProps = (state, props) => {
  return {
    ...props,
    options: campgroundOptionsSelector(state)
  };
};

export default connect(
  mapStateToProps,
  {
    handleQueryCampgrounds: queryCampgrounds
  }
)(CampgroundSearch);
