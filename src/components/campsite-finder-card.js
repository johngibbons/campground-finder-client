import React from 'react'
import './campsite-finder-card.css'
import ResultsTable from './results-table'
import {
  Card,
  Checkbox,
  Form,
  Radio,
  List,
  Image,
  Icon,
  Dropdown,
  Confirm
} from 'semantic-ui-react'
import 'react-dates/lib/css/_datepicker.css'
import { DateRangePicker } from 'react-dates'
import { NEXT_SIX_MONTHS, SPECIFIC_DATES } from '../modules/campsiteFinders'
import { both, map, remove } from 'ramda'
import {
  captializeTitle,
  secretEmail,
  replaceImages
} from '../helpers/reducerHelpers'
import moment from 'moment'

const CampsiteFinderCard = ({
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
    focusedDate,
    isConfirmOpen,
    isShowingAllResults
  },
  handleUpdateCampsiteFinder,
  handleDeleteCampsiteFinder,
  handleSetEmailValue,
  handleDateFocusChange,
  handleToggleConfirm,
  handleToggleShowAllResults
}) => {
  const hasAvailableSites = datesAvailable.length > 0
  return (
    <Card
      className='campsite-finder-card'
      color={hasAvailableSites ? 'green' : isActive ? 'red' : 'yellow'}
    >
      <Card.Content extra>
        <Card.Header className='campsite-finder-card__header'>
          {captializeTitle(campgroundId.facilityName)}
          <div className='campsite-finder-card__on-off'>
            <Dropdown icon={isActive ? 'pause' : 'play'}>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() =>
                    handleUpdateCampsiteFinder(_id, { isActive: !isActive })}
                >
                  <Icon name={isActive ? 'pause' : 'play'} fitted />
                  {isActive ? 'Pause' : 'Resume'}
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleToggleConfirm(_id)}>
                  <Icon name='delete' />
                  Delete
                </Dropdown.Item>
                <Confirm
                  open={isConfirmOpen}
                  onConfirm={() => handleDeleteCampsiteFinder(_id)}
                  onCancel={() => handleToggleConfirm(_id)}
                />
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Card.Header>
      </Card.Content>
      <div className='campsite-finder-card__image-wrapper'>
        <a
          className='campsite-finder-card__title-link'
          href={campgroundId.url}
          target='blank'
        >
          <Image
            className='campsite-finder-card__campground-image'
            src={replaceImages(
              `http://reserveamerica.com${campgroundId.facilityPhoto}`
            )}
          />
        </a>
      </div>
      <Card.Content className='campsite-finder-card__settings'>
        <Card.Meta className='campsite-finder-card__sub-heading'>
          Settings
        </Card.Meta>
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
          <Form.Field>
            <Radio
              label='Next 6 Months'
              name='datesSelector'
              checked={dateOption === NEXT_SIX_MONTHS}
              onChange={() =>
                handleUpdateCampsiteFinder(_id, {
                  dateOption: NEXT_SIX_MONTHS
                })}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label='Specific Dates'
              name='datesSelector'
              checked={dateOption === SPECIFIC_DATES}
              onChange={() =>
                handleUpdateCampsiteFinder(_id, { dateOption: SPECIFIC_DATES })}
            />
          </Form.Field>
        </Form>
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
            <Form.Field>
              <Radio label='Daily' />
            </Form.Field>}
          {isSendingEmails &&
            <Form.Field>
              <Radio label='Immediate' />
            </Form.Field>}
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
      </Card.Content>
      <Card.Content>
        <Card.Meta className='campsite-finder-card__sub-heading'>
          Results
        </Card.Meta>
        {datesAvailable.length > 0
          ? <ResultsTable
            results={datesAvailable}
            isShowingAll={isShowingAllResults}
            handleToggleShowAll={() => handleToggleShowAllResults(_id)}
          />
          : <div>No spots available</div>}
      </Card.Content>
    </Card>
  )
}

export default CampsiteFinderCard
