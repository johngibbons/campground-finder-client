import React, { Component } from "react";
import { connect } from "react-redux";
import {
  campsiteFindersSelector,
  fetchAllCampsiteFinders,
  isFindersCollectionLoadedSelector,
  isFindersCollectionErrorSelector
} from "../modules/campsiteFinders";
import CampsiteFindersCollection from "../components/campsite-finders-collection";

class CampsiteFindersCollectionContainer extends Component {
  componentWillMount() {
    this.props.handleFetchAll();
  }

  render() {
    return <CampsiteFindersCollection {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    campsiteFinders: campsiteFindersSelector(state),
    isLoaded: isFindersCollectionLoadedSelector(state),
    isError: isFindersCollectionErrorSelector(state)
  };
};

export default connect(
  mapStateToProps,
  {
    handleFetchAll: fetchAllCampsiteFinders
  }
)(CampsiteFindersCollectionContainer);
