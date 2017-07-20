import React from 'react'
import './campsite-finder-settings-form.css'
import { Form, Card } from 'semantic-ui-react'
import WeekendsOnlyOption from './weekends-only-option'
import DateOption from './date-option'
import SiteCodesInput from './site-codes-input'
import NotificationSettings from './notification-settings'

const CampsiteFinderSettingsForm = ({
  campsiteFinder: {
    _id,
    campgroundId,
    isActive,
    isWeekendsOnly,
    isSendingEmails,
    emailAddresses,
    emailValue,
    dateOption,
    datesAvailable,
    startDate,
    endDate,
    siteCode,
    focusedDate,
    isConfirmOpen,
    isShowingAllResults,
    isSettingsShowing,
    lastCheckedAt
  }
}) => {
  return (
    <div>
      <Form className='campsite-finder-card__form'>
        <Card.Meta className='campsite-finder-card__sub-heading'>
          Dates
        </Card.Meta>
        <DateOption
          _id={_id}
          dateOption={dateOption}
          startDate={startDate}
          endDate={endDate}
          focusedDate={focusedDate}
        />
        <WeekendsOnlyOption _id={_id} isWeekendsOnly={isWeekendsOnly} />
        <SiteCodesInput _id={_id} siteCode={siteCode} />
      </Form>
      <Card.Meta className='campsite-finder-card__sub-heading'>
        Notification Settings
      </Card.Meta>
      <NotificationSettings
        _id={_id}
        isSendingEmails={isSendingEmails}
        emailAddresses={emailAddresses}
        emailValue={emailValue}
      />
    </div>
  )
}

export default CampsiteFinderSettingsForm
