import React from 'react'
import { connect } from 'react-redux'
import { Form } from 'semantic-ui-react'
import { setSiteCodeValue } from '../modules/campsiteFinders'

const SiteCodesInput = ({ _id, siteCode, handleSetSiteCodeValue }) => {
  return (
    <Form.Input
      placeholder='Enter site codes... (e.g. 1, 3, 4)'
      label='Specific Sites'
      value={siteCode || ''}
      onChange={(e, { value }) => handleSetSiteCodeValue(_id, value)}
    />
  )
}

export default connect(null, {
  handleSetSiteCodeValue: setSiteCodeValue
})(SiteCodesInput)
