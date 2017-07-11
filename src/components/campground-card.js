import React from 'react'
import './campground-card.css'
import { Card, Checkbox, Form, Radio } from 'semantic-ui-react'
import 'react-dates/lib/css/_datepicker.css'
import { DateRangePicker } from 'react-dates'
import { NEXT_SIX_MONTHS, SPECIFIC_DATES } from '../modules/campgrounds'

const CampgroundCard = ({
  campground: {
    id,
    title,
    active,
    weekends,
    dateOption,
    startDate,
    endDate,
    focusedDate
  },
  handleToggleWeekends,
  handleToggleActive,
  handleSelectDateOption,
  handleSetDates,
  handleDateFocusChange
}) => {
  return (
    <Card className='campground-card'>
      <Card.Content>
        <Card.Header className='campground-card__header'>
          {title}
          <div className='campground-card__on-off'>
            <label className='campground-card__label'>
              <span className='campground-card__label-text'>on/off</span>
              <Checkbox
                className='campground-card__toggle'
                checked={active}
                onChange={() => handleToggleActive(id)}
                toggle
              />
            </label>
          </div>
        </Card.Header>
      </Card.Content>
      <Card.Content>
        <Form className='campground-card__form'>
          <Form.Field>
            <Checkbox
              label='Weekends only'
              checked={weekends}
              onChange={() => handleToggleWeekends(id)}
            />
          </Form.Field>
          <Card.Meta className='campground-card__sub-heading'>Dates</Card.Meta>
          <Form.Field>
            <Radio
              label='Next 6 Months'
              name='datesSelector'
              checked={dateOption === NEXT_SIX_MONTHS}
              onChange={() => handleSelectDateOption(id, NEXT_SIX_MONTHS)}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label='Specific Dates'
              name='datesSelector'
              checked={dateOption === SPECIFIC_DATES}
              onChange={() => handleSelectDateOption(id, SPECIFIC_DATES)}
            />
          </Form.Field>
        </Form>
        {dateOption === SPECIFIC_DATES &&
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onDatesChange={({ startDate, endDate }) =>
              handleSetDates(id, startDate, endDate)}
            focusedInput={focusedDate}
            onFocusChange={focusedDate =>
              handleDateFocusChange(id, focusedDate)}
            numberOfMonths={1}
            showClearDates
            reopenPickerOnClearDates
          />}
      </Card.Content>
    </Card>
  )
}

export default CampgroundCard
