import React from 'react'
import { connect } from 'react-redux'
import { secretEmail } from '../helpers/reducerHelpers'
import { Form, Checkbox, List } from 'semantic-ui-react'
import {
  toggleIsSendingEmails,
  addEmailAddress,
  removeEmailAddress,
  setEmailValue
} from '../modules/campsiteFinders'

const NotificationSettings = ({
  _id,
  isSendingEmails,
  emailAddresses,
  emailValue,
  handleToggleIsSendingEmails,
  handleAddEmailAddress,
  handleRemoveEmailAddress,
  handleSetEmailValue
}) => {
  return (
    <Form onSubmit={() => handleAddEmailAddress(_id, emailValue)}>
      <Form.Field>
        <Checkbox
          label='Send emails'
          checked={isSendingEmails}
          onChange={() => handleToggleIsSendingEmails(_id)}
        />
      </Form.Field>
      {isSendingEmails &&
        !!emailAddresses.length &&
        <List relaxed selection>
          {emailAddresses.map((emailAddress, i) => {
            return (
              <List.Item
                key={i}
                className='campsite-finder-card__email'
                onClick={(e, { children }) => handleRemoveEmailAddress(_id, i)}
              >
                {secretEmail(emailAddress)}
              </List.Item>
            )
          })}
        </List>}
      {isSendingEmails &&
        <Form.Input
          placeholder='Enter emails...'
          value={emailValue || ''}
          onChange={(e, { value }) => handleSetEmailValue(_id, value)}
        />}
    </Form>
  )
}

export default connect(null, {
  handleToggleIsSendingEmails: toggleIsSendingEmails,
  handleAddEmailAddress: addEmailAddress,
  handleRemoveEmailAddress: removeEmailAddress,
  handleSetEmailValue: setEmailValue
})(NotificationSettings)
