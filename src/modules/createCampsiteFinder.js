import { createSlice } from "redux-starter-kit";

export const FINDER_TYPE_FIELD = "FINDER_TYPE";
export const NAME_FIELD = "NAME";
export const START_DATE_FIELD = "START_DATE";
export const END_DATE_FIELD = "END_DATE";
export const FOCUSED_DATE_FIELD = "FOCUSED_DATE";
export const NIGHTS_OF_THE_WEEK_FIELD = "NIGHTS_OF_THE_WEEK";
export const ALL_NIGHTS_OF_THE_WEEK_TOGGLE = "ALL_NIGHTS_OF_THE_WEEK_TOGGLE";
export const MIN_NIGHTS_FIELD = "MIN_NIGHTS";
export const SPECIFIC_TRIP = "SPECIFIC_TRIP";
export const CONTINUOUS = "CONTINUOUS";
export const DAYS_OF_THE_WEEK = {
  SUNDAY: "SUNDAY",
  MONDAY: "MONDAY",
  TUESDAY: "TUESDAY",
  WEDNESDAY: "WEDNESDAY",
  THURSDAY: "THURSDAY",
  FRIDAY: "FRIDAY",
  SATURDAY: "SATURDAY"
};

export const allNightsChecked = nightsObj => {
  const values = Object.values(nightsObj);
  return values.length === 7 && values.every(val => val === true);
};

const createCampsiteFinderSlice = createSlice({
  slice: "create-campsite-finder",
  initialState: {
    [NAME_FIELD]: { value: "" },
    [FINDER_TYPE_FIELD]: { value: SPECIFIC_TRIP },
    [FOCUSED_DATE_FIELD]: {},
    [NIGHTS_OF_THE_WEEK_FIELD]: {},
    [MIN_NIGHTS_FIELD]: { value: 1 }
  },
  reducers: {
    updateField: (state, { payload: { fieldName, value } }) => {
      const field = state[fieldName];
      field.value = value;
      field.isDirty = true;
    },
    blurField: (state, { payload: { fieldName } }) => {
      const field = state[fieldName];
      field.isDirty = true;
    },
    setDates: (state, { payload: { startDate, endDate } }) => {
      state[START_DATE_FIELD] = startDate;
      state[END_DATE_FIELD] = endDate;
    },
    toggleNightOfTheWeek: (state, { payload: { nightOfTheWeek } }) => {
      const prevValue = state[NIGHTS_OF_THE_WEEK_FIELD][nightOfTheWeek];
      state[NIGHTS_OF_THE_WEEK_FIELD][nightOfTheWeek] = !prevValue;
    },
    toggleAllNightsOfTheWeek: state => {
      const isChecked = state[ALL_NIGHTS_OF_THE_WEEK_TOGGLE];
      state[NIGHTS_OF_THE_WEEK_FIELD] = isChecked
        ? {}
        : Object.keys(DAYS_OF_THE_WEEK).reduce(
            (acc, day) => ({ ...acc, [day]: true }),
            {}
          );
      state[ALL_NIGHTS_OF_THE_WEEK_TOGGLE] = !isChecked;
    }
  }
});

const { actions, reducer } = createCampsiteFinderSlice;
export const {
  updateField,
  blurField,
  setDates,
  toggleNightOfTheWeek,
  toggleAllNightsOfTheWeek
} = actions;
export default reducer;
