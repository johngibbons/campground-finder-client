import React from 'react'
import './campsite-finder-card.css'
import ResultsTable from './results-table'
import {
  Button,
  Card,
  Checkbox,
  Form,
  List,
  Image,
  Icon,
  Dropdown,
  Confirm
} from 'semantic-ui-react'
import 'react-dates/lib/css/_datepicker.css'
import { DateRangePicker } from 'react-dates'
import { NEXT_SIX_MONTHS, SPECIFIC_DATES } from '../modules/campsiteFinders'
import { both, map, remove, path, pathEq } from 'ramda'
import {
  captializeTitle,
  secretEmail,
  replaceImages,
  tempOrRealAttrIs
} from '../helpers/reducerHelpers'
import moment from 'moment'

const CampsiteFinderCard = ({
  campsiteFinder,
  handleUpdateCampsiteFinder,
  handleDeleteCampsiteFinder,
  handleSetEmailValue,
  handleSetSiteCodeValue,
  handleSetDateOption,
  handleDateFocusChange,
  handleToggleConfirm,
  handleToggleSettigsFormShowing,
  handleToggleShowAllResults,
  handleToggleIsWeekendsOnly
}) => {
  const {
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
  } = campsiteFinder
  const hasAvailableSites = datesAvailable.length > 0
  console.log(campsiteFinder.tempAttrs)
  const attrIs = tempOrRealAttrIs(campsiteFinder)
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
          <a
            className='campsite-finder-card__edit-link'
            onClick={() => handleToggleSettigsFormShowing(_id)}
          >
            {isSettingsShowing
              ? <Button primary compact>
                  Save
              </Button>
              : 'Edit'}
          </a>
        </Card.Meta>
        {isSettingsShowing
          ? <Form
            className='campsite-finder-card__form'
            onSubmit={() => {
              handleUpdateCampsiteFinder(_id, {
                emailAddresses: JSON.stringify([
                  ...emailAddresses,
                  emailValue
                ])
              })
              handleSetEmailValue(_id, '')
            }}
          >
            <Form.Field>
              <Checkbox
                label='Weekends only'
                checked={
                  attrIs('dateOption', NEXT_SIX_MONTHS) ||
                    attrIs('isWeekendsOnly', true)
                }
                onChange={() => handleToggleIsWeekendsOnly(_id)}
              />
            </Form.Field>
            <Card.Meta className='campsite-finder-card__sub-heading'>
                Dates
            </Card.Meta>
            <Form.Group inline>
              <Form.Radio
                label='Next 6 Months'
                name='datesSelector'
                checked={attrIs('dateOption', NEXT_SIX_MONTHS)}
                onChange={() => handleSetDateOption(_id, NEXT_SIX_MONTHS)}
              />
              <Form.Radio
                label='Specific Dates'
                name='datesSelector'
                checked={attrIs('dateOption', SPECIFIC_DATES)}
                onChange={() => handleSetDateOption(_id, SPECIFIC_DATES)}
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
            <Card.Meta className='campsite-finder-card__sub-heading'>
                Notification Settings
            </Card.Meta>
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
          : <List>
            <List.Item>
              <List.Header className='float-left'>Weekends Only</List.Header>
              <Icon
                className='float-right'
                name={isWeekendsOnly ? 'check circle' : 'remove circle'}
              />
            </List.Item>
            <List.Item>
              <List.Header className='float-left'>Dates</List.Header>
              <span className='float-right'>
                {dateOption === SPECIFIC_DATES
                  ? `${moment(startDate).format('MM/DD/YY')} -
                    ${moment(endDate).format('MM/DD/YY')}`
                  : 'Next Six Months'}
              </span>
            </List.Item>
            {siteCode &&
                <List.Item>
                  <List.Header className='float-left'>Site Codes</List.Header>
                  <span className='float-right'>
                    {siteCode}
                  </span>
                </List.Item>}
            <List.Item>
              <List.Header className='float-left'>
                  Notification Settings
              </List.Header>
              <span className='float-right'>
                {isSendingEmails ? 'Email' : 'None'}
              </span>
            </List.Item>
          </List>}
      </Card.Content>
      <Card.Content>
        <Card.Meta className='campsite-finder-card__sub-heading'>
          Results
          <div className='campsite-finder-card__sub-sub-heading'>
            {lastCheckedAt
              ? `Updated ${moment(lastCheckedAt).fromNow()}`
              : `Not checked yet`}
          </div>
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
