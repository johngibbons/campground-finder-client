import { combineReducers } from "redux";
import { ajax } from "rxjs/observable/dom/ajax";

const UPDATE_FIELD = "users/UPDATE_FIELD";
const BLUR_FIELD = "users/BLUR_FIELD";
const CREATE_USER = "users/CREATE_USER";
const CREATE_USER_FULFILLED = "users/CREATE_USER_FULFILLED";
const CREATE_USER_FAILED = "users/CREATE_USER_FAILED";

export const SIGN_UP_EMAIL = "SIGN_UP_EMAIL";
export const SIGN_UP_PASSWORD = "SIGN_UP_PASSWORD";
export const SIGN_UP_PASSWORD_CONFIRM = "SIGN_UP_PASSWORD_CONFIRM";
export const LOGIN_EMAIL = "LOGIN_EMAIL";
export const LOGIN_PASSWORD = "LOGIN_PASSWORD";

export default function(
  state = {
    [SIGN_UP_EMAIL]: { value: "" },
    [SIGN_UP_PASSWORD]: { value: "" },
    [SIGN_UP_PASSWORD_CONFIRM]: { value: "" },
    [LOGIN_EMAIL]: { value: "" },
    [LOGIN_PASSWORD]: { value: "" }
  },
  action = {}
) {
  switch (action.type) {
    case UPDATE_FIELD: {
      return {
        ...state,
        [action.fieldName]: { value: action.value, isDirty: true }
      };
    }
    case BLUR_FIELD: {
      return {
        ...state,
        [action.fieldName]: { ...state[action.fieldName], isDirty: true }
      };
    }
    default: {
      return state;
    }
  }
}

export function updateField(fieldName, value) {
  return {
    type: UPDATE_FIELD,
    fieldName,
    value
  };
}

export function blurField(fieldName) {
  return {
    type: BLUR_FIELD,
    fieldName
  };
}

export function createUser(user) {
  return {
    type: CREATE_USER,
    user
  };
}

function createUserFulfilled(user) {
  return {
    type: CREATE_USER_FULFILLED,
    user
  };
}

function createUserFailed(error) {
  return {
    type: CREATE_USER_FAILED,
    error
  };
}

// EPICS
const base = process.env.REACT_APP_HOST;

export const createUserEpic = action$ =>
  action$.ofType(CREATE_USER).mergeMap(action =>
    ajax({
      url: `${base}/users`,
      body: action.user,
      method: "POST",
      responseType: "json"
    })
      .map(({ response }) => createUserFulfilled(response))
      .catch(err => {
        console.log(err);
        createUserFailed(err);
      })
  );
