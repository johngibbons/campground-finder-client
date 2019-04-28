import React from "react";
import { connect } from "react-redux";
import { Container, Header, Form, Label, Input, List } from "semantic-ui-react";
import {
  NAME_FIELD,
  FINDER_TYPE_FIELD,
  START_DATE_FIELD,
  END_DATE_FIELD,
  FOCUSED_DATE_FIELD,
  NIGHTS_OF_THE_WEEK_FIELD,
  ALL_NIGHTS_OF_THE_WEEK_TOGGLE,
  MIN_NIGHTS_FIELD,
  SPECIFIC_TRIP,
  GENERAL_AVAILABILITY,
  DAYS_OF_THE_WEEK,
  updateField,
  blurField,
  setDates,
  toggleNightOfTheWeek,
  toggleAllNightsOfTheWeek,
  selectCampground,
  campgroundsSelector,
  createCampsiteFinder,
  createFormJsonSelector
} from "../modules/createCampsiteFinder";
import moment from "moment";
import { both, map } from "ramda";
import { DateRangePicker } from "react-dates";
import "./campsite-finder-creation.css";
import CampgroundSearchContainer from "../containers/campground-search-container";

const CampsiteFinderCreation = ({
  finderType,
  name,
  startDate,
  endDate,
  focusedDate,
  nightsOfTheWeek,
  allNightsOfTheWeekToggle,
  minNights,
  campgrounds,
  formJson,
  history,
  handleBlurField,
  handleUpdateField,
  handleSetDates,
  handleToggleNightOfTheWeek,
  handleToggleAllNightsOfTheWeek,
  handleSelectCampground,
  handleFormSubmit
}) => {
  const numNights =
    startDate && endDate && moment(endDate).diff(startDate, "days");

  return (
    <section className="campsite-finder-creation">
      <Container text>
        <Header as="h1">Create an Alert</Header>
        <Form onSubmit={() => handleFormSubmit(formJson, history)}>
          <Form.Group inline>
            <label>What type of alert?</label>
            <Form.Radio
              label="Specific Trip"
              value={SPECIFIC_TRIP}
              checked={finderType.value === SPECIFIC_TRIP}
              onChange={() =>
                handleUpdateField(FINDER_TYPE_FIELD, SPECIFIC_TRIP)
              }
            />
            <Form.Radio
              label="Continuos Monitoring"
              value={GENERAL_AVAILABILITY}
              checked={finderType.value === GENERAL_AVAILABILITY}
              onChange={() =>
                handleUpdateField(FINDER_TYPE_FIELD, GENERAL_AVAILABILITY)
              }
            />
          </Form.Group>
          <Form.Input
            id="campsite-finder-creation-name-field"
            label="Name"
            placeholder="Enter a name for your Alert"
            onChange={(e, { value }) => handleUpdateField(NAME_FIELD, value)}
            onBlur={() => handleBlurField(NAME_FIELD)}
            value={name.value}
            error={name.isDirty && !name.value}
            required
          />
          {finderType.value === SPECIFIC_TRIP && (
            <Form.Field required>
              <label>When would you like to camp?</label>
              <DateRangePicker
                startDate={startDate ? moment(startDate) : null}
                endDate={endDate ? moment(endDate) : null}
                onDatesChange={({ startDate, endDate }) => {
                  const params = { startDate, endDate };
                  const format = t => t.format();
                  const nullToStr = t => t || "";
                  const convert = both(nullToStr, format);
                  const makeParams = map(convert);
                  handleSetDates(makeParams(params));
                }}
                focusedInput={focusedDate.value}
                onFocusChange={focusedDate =>
                  handleUpdateField(FOCUSED_DATE_FIELD, focusedDate)
                }
                numberOfMonths={1}
                isOutsideRange={date => {
                  return moment(date).diff(moment(), "days") < 1;
                }}
                showClearDates
                reopenPickerOnClearDates
              />
              {startDate && endDate && (
                <Label>
                  {numNights} {numNights > 1 ? "nights" : "night"}
                </Label>
              )}
            </Form.Field>
          )}
          {finderType.value === GENERAL_AVAILABILITY && (
            <Form.Group grouped>
              <label>Which nights of the week do you want to check for?</label>
              <Form.Checkbox
                id="toggle-all-nights"
                label={"Toggle All"}
                checked={allNightsOfTheWeekToggle}
                onChange={handleToggleAllNightsOfTheWeek}
              />
              <div className="campsite-finder-creation__nights-of-the-week">
                {Object.values(DAYS_OF_THE_WEEK).map(day => (
                  <Form.Checkbox
                    id={day}
                    key={day}
                    className="text-capitalized campsite-finder-creation__nights-of-the-week"
                    label={day.toLowerCase()}
                    checked={nightsOfTheWeek[day]}
                    onChange={() => handleToggleNightOfTheWeek(day)}
                  />
                ))}
              </div>
            </Form.Group>
          )}
          {finderType.value === GENERAL_AVAILABILITY && (
            <Form.Field error={minNights.isDirty && !minNights.value} required>
              <label htmlFor="campsite-finder-creation-min-nights-field">
                What is the minimum number of nights you want to camp for?
              </label>
              <Input
                id="campsite-finder-creation-min-nights-field"
                type="number"
                className="two wide column"
                onChange={(e, { value }) =>
                  handleUpdateField(MIN_NIGHTS_FIELD, value)
                }
                value={minNights.value}
                min={1}
                label={{ basic: true, content: "nights" }}
                labelPosition="right"
              />
            </Form.Field>
          )}
          <Form.Field>
            <label htmlFor="campsite-finder-creation-campgrounds-search">
              Which campgrounds do you want to check?
            </label>
            <CampgroundSearchContainer
              onSelectCampground={handleSelectCampground}
            />
          </Form.Field>
          <List selection relaxed>
            {campgrounds.map(campground => {
              return (
                <List.Item>
                  <List.Content>
                    <List.Header>{campground.name}</List.Header>
                    <List.Description>
                      {campground.secondaryName}
                    </List.Description>
                  </List.Content>
                </List.Item>
              );
            })}
          </List>
          <Form.Button primary>Create Alert</Form.Button>
        </Form>
      </Container>
    </section>
  );
};

const mapStateToProps = state => {
  const createCampsiteFinderState = state.createCampsiteFinder;
  return {
    name: createCampsiteFinderState[NAME_FIELD],
    finderType: createCampsiteFinderState[FINDER_TYPE_FIELD],
    startDate: createCampsiteFinderState[START_DATE_FIELD],
    endDate: createCampsiteFinderState[END_DATE_FIELD],
    focusedDate: createCampsiteFinderState[FOCUSED_DATE_FIELD],
    nightsOfTheWeek: createCampsiteFinderState[NIGHTS_OF_THE_WEEK_FIELD],
    allNightsOfTheWeekToggle:
      createCampsiteFinderState[ALL_NIGHTS_OF_THE_WEEK_TOGGLE],
    minNights: createCampsiteFinderState[MIN_NIGHTS_FIELD],
    campgrounds: campgroundsSelector(state),
    formJson: createFormJsonSelector(state)
  };
};

export default connect(
  mapStateToProps,
  {
    handleUpdateField: (fieldName, value) => updateField({ fieldName, value }),
    handleBlurField: fieldName => blurField({ fieldName }),
    handleSetDates: ({ startDate, endDate }) =>
      setDates({ startDate, endDate }),
    handleToggleNightOfTheWeek: nightOfTheWeek =>
      toggleNightOfTheWeek({ nightOfTheWeek }),
    handleToggleAllNightsOfTheWeek: toggleAllNightsOfTheWeek,
    handleSelectCampground: campgroundId => selectCampground({ campgroundId }),
    handleFormSubmit: (formBody, history) =>
      createCampsiteFinder({ formBody, history })
  }
)(CampsiteFinderCreation);
