import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  campsiteFindersSelector,
  fetchAllCampsiteFinders
} from '../modules/campsiteFinders'
import CampsiteFindersCollection from '../components/campsite-finders-collection'

class CampsiteFindersCollectionContainer extends Component {
  componentWillMount () {
    this.props.handleFetchAll()
  }

  render () {
    return (
      <CampsiteFindersCollection campsiteFinders={this.props.campsiteFinders} />
    )
  }
}

const mapStateToProps = state => {
  console.log(state)
  console.log('selected:', campsiteFindersSelector(state))
  return {
    campsiteFinders: campsiteFindersSelector(state)
  }
}

export default connect(mapStateToProps, {
  handleFetchAll: fetchAllCampsiteFinders
})(CampsiteFindersCollectionContainer)
