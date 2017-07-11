import React from 'react'
import './campground-card.css'
import { Card, Checkbox, Form, Radio } from 'semantic-ui-react'
import 'react-dates/lib/css/_datepicker.css'
import { DateRangePicker } from 'react-dates'
import { ALL_WEEKENDS, SPECIFIC_DATES } from '../modules/campgrounds'

const CampgroundCard = ({
  campground: { id, title, active, dateOption },
  handleSelectDateOption,
  handleToggleActive
}) => {
  return (
    <Card>
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
        <Card.Meta>Dates</Card.Meta>
        <Card.Description>
          <Form>
            <Form.Field>
              <Radio
                label='All Weekends (next 6 months)'
                name='datesSelector'
                checked={dateOption === ALL_WEEKENDS}
                onChange={() => handleSelectDateOption(id, ALL_WEEKENDS)}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label='Specific Dates'
                name='datesSelector'
                checked={dateOption === SPECIFIC_DATES}
                onChange={() => handleSelectDateOption(id, SPECIFIC_DATES)}
              />
              {dateOption === SPECIFIC_DATES && <DateRangePicker />}
            </Form.Field>
          </Form>
        </Card.Description>
      </Card.Content>
    </Card>
  )
}

export default CampgroundCard
