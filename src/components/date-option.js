import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { both, map } from 'ramda'
import { Form } from 'semantic-ui-react'
import { DateRangePicker } from 'react-dates'
import {
  NEXT_SIX_MONTHS,
  SPECIFIC_DATES,
  setDateOption,
  setDateFocus,
  setDates
} from '../modules/campsiteFinders'

const DateOption = ({
  _id,
  dateOption,
  startDate,
  endDate,
  focusedDate,
  handleSetDateOption,
  handleSetDateFocus,
  handleSetDates
}) => {
  return (
    <div>
      <Form.Group inline>
        <Form.Radio
          label='Next 6 Months'
          name='datesSelector'
          checked={dateOption === NEXT_SIX_MONTHS}
          onChange={() => handleSetDateOption(_id, NEXT_SIX_MONTHS)}
        />
        <Form.Radio
          label='Specific Dates'
          name='datesSelector'
          checked={dateOption === SPECIFIC_DATES}
          onChange={() => handleSetDateOption(_id, SPECIFIC_DATES)}
        />
      </Form.Group>
      {dateOption === SPECIFIC_DATES &&
        <DateRangePicker
          startDate={startDate ? moment(startDate) : null}
          endDate={endDate ? moment(endDate) : null}
          onDatesChange={({ startDate, endDate }) => {
            const params = { startDate, endDate }
            const format = t => t.format()
            const nullToStr = t => t || ''
            const convert = both(nullToStr, format)
            const makeParams = map(convert)
            handleSetDates(_id, makeParams(params))
          }}
          focusedInput={focusedDate}
          onFocusChange={focusedDate => handleSetDateFocus(_id, focusedDate)}
          numberOfMonths={1}
          isOutsideRange={date => {
            return moment(date).diff(moment(), 'days') < 1
          }}
          showClearDates
          reopenPickerOnClearDates
        />}
    </div>
  )
}

export default connect(null, {
  handleSetDateOption: setDateOption,
  handleSetDateFocus: setDateFocus,
  handleSetDates: setDates
})(DateOption)
