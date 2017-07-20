import React from 'react'
import './campsite-finder-settings.css'
import { Form } from 'semantic-ui-react'

const CampsiteFinderSettingsForm = ({}) => {
  return (
        <Form className='campsite-finder-card__form'>
          <Form.Field>
            <Checkbox
              label='Weekends only'
              checked={dateOption === NEXT_SIX_MONTHS || isWeekendsOnly}
              onChange={() =>
                handleUpdateCampsiteFinder(_id, {
                  isWeekendsOnly: !isWeekendsOnly
                })}
            />
          </Form.Field>
          <Card.Meta className='campsite-finder-card__sub-heading'>
            Dates
          </Card.Meta>
          <Form.Group inline>
            <Form.Radio
              label='Next 6 Months'
              name='datesSelector'
              checked={dateOption === NEXT_SIX_MONTHS}
              onChange={() =>
                handleUpdateCampsiteFinder(_id, {
                  dateOption: NEXT_SIX_MONTHS
                })}
            />
            <Form.Radio
              label='Specific Dates'
              name='datesSelector'
              checked={dateOption === SPECIFIC_DATES}
              onChange={() =>
                handleUpdateCampsiteFinder(_id, { dateOption: SPECIFIC_DATES })}
            />
          </Form.Group>
          {dateOption === SPECIFIC_DATES &&
            <DateRangePicker
              startDate={startDate && moment(startDate)}
              endDate={endDate && moment(endDate)}
              onDatesChange={({ startDate, endDate }) => {
                const params = { startDate, endDate }
                const format = t => t.format()
                const nullToStr = t => t || ''
                const convert = both(nullToStr, format)
                const makeParams = map(convert)
                handleUpdateCampsiteFinder(_id, makeParams(params))
              }}
              focusedInput={focusedDate}
              onFocusChange={focusedDate =>
                handleDateFocusChange(_id, focusedDate)}
              numberOfMonths={1}
              isOutsideRange={date => {
                return moment(date).diff(moment(), 'days') < 1
              }}
              showClearDates
              reopenPickerOnClearDates
            />}
          <Form.Input
            placeholder='Enter site codes...'
            label='Site codes'
            value={siteCode || ''}
            onChange={(e, { value }) => handleSetSiteCodeValue(_id, value)}
          />
        </Form>
        <Card.Meta className='campsite-finder-card__sub-heading'>
          Notification Settings
        </Card.Meta>
        <Form
          onSubmit={() => {
            handleUpdateCampsiteFinder(_id, {
              emailAddresses: JSON.stringify([...emailAddresses, emailValue])
            })
            handleSetEmailValue(_id, '')
          }}
        >
          <Form.Field>
            <Checkbox
              label='Send emails'
              checked={isSendingEmails}
              onChange={() =>
                handleUpdateCampsiteFinder(_id, {
                  isSendingEmails: !isSendingEmails
                })}
            />
          </Form.Field>
          {isSendingEmails &&
            <Form.Group inline>
              <Form.Radio label='Daily' />
              <Form.Radio label='Immediate' />
            </Form.Group>}
          {isSendingEmails &&
            !!emailAddresses.length &&
            <List relaxed selection>
              {emailAddresses.map((emailAddress, i) => {
                return (
                  <List.Item
                    key={i}
                    className='campsite-finder-card__email'
                    onClick={(e, { children }) =>
                      handleUpdateCampsiteFinder(_id, {
                        emailAddresses: JSON.stringify(
                          remove(i, 1, emailAddresses)
                        )
                      })}
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

export default CampsiteFinderSettingsForm
