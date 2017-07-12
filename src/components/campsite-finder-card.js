import React from 'react'
import './campsite-finder-card.css'
import { Card, Checkbox, Form, Radio } from 'semantic-ui-react'
import 'react-dates/lib/css/_datepicker.css'
import { DateRangePicker } from 'react-dates'
import { NEXT_SIX_MONTHS, SPECIFIC_DATES } from '../modules/campsiteFinders'
import { both, map } from 'ramda'
import { captializeTitle } from '../helpers/reducerHelpers'
import moment from 'moment'

const CampsiteFinderCard = ({
  campsiteFinder: {
    _id,
    campgroundId,
    isActive,
    isWeekendsOnly,
    dateOption,
    startDate,
    endDate,
    focusedDate
  },
  handleUpdateCampsiteFinder,
  handleSetDates,
  handleDateFocusChange
}) => {
  return (
    <Card className='campsite-finder-card'>
      <Card.Content extra>
        <Card.Header className='campsite-finder-card__header'>
          {captializeTitle(campgroundId.facilityName)}
          <div className='campsite-finder-card__on-off'>
            <label className='campsite-finder-card__label'>
              <span className='campsite-finder-card__label-text'>on/off</span>
              <Checkbox
                className='campsite-finder-card__toggle'
                checked={isActive}
                onChange={() =>
                  handleUpdateCampsiteFinder(_id, { isActive: !isActive })}
                toggle
              />
            </label>
          </div>
        </Card.Header>
      </Card.Content>
      <Card.Content>
        <Form className='campsite-finder-card__form'>
          <Form.Field>
            <Checkbox
              label='Weekends only'
              checked={isWeekendsOnly}
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
            showClearDates
            reopenPickerOnClearDates
          />}
      </Card.Content>
    </Card>
  )
}

export default CampsiteFinderCard
