import React from 'react'
import { connect } from 'react-redux'
import { Form, Checkbox } from 'semantic-ui-react'
import { toggleIsWeekendsOnly } from '../modules/campsiteFinders'

const WeekendsOnlyOption = ({
  _id,
  isWeekendsOnly,
  handleToggleIsWeekendsOnly
}) => {
  return (
    <Form.Field>
      <Checkbox
        label='Weekends only'
        checked={isWeekendsOnly}
        onChange={() => handleToggleIsWeekendsOnly(_id)}
      />
    </Form.Field>
  )
}

export default connect(null, {
  handleToggleIsWeekendsOnly: toggleIsWeekendsOnly
})(WeekendsOnlyOption)
