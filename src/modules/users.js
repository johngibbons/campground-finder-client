import { combineReducers } from "redux";
const UPDATE_SIGNUP_FIELD = "users/UPDATE_SIGNUP_FIELD";
const BLUR_SIGNUP_FIELD = "users/BLUR_SIGNUP_FIELD";
const CREATE_USER_FULFILLED = "users/CREATE_USER_FULFILLED";
const CREATE_USER_FAILED = "users/CREATE_USER_FAILED";
const SET_SIGNUP_FORM_ERRORS = "users/SET_SIGNUP_FORM_ERRORS";
const UPDATE_LOGIN_FIELD = "users/UPDATE_LOGIN_FIELD";
const BLUR_LOGIN_FIELD = "users/BLUR_LOGIN_FIELD";
const LOG_IN_USER_FULFILLED = "users/LOG_IN_USER_FULFILLED";
const LOG_IN_USER_FAILED = "users/LOG_IN_USER_FAILED";
const SET_LOGIN_FORM_ERRORS = "users/SET_LOGIN_FORM_ERRORS";
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const SIGN_UP_EMAIL = "SIGN_UP_EMAIL";
export const SIGN_UP_PASSWORD = "SIGN_UP_PASSWORD";
export const SIGN_UP_PASSWORD_CONFIRM = "SIGN_UP_PASSWORD_CONFIRM";
export const LOGIN_EMAIL = "LOGIN_EMAIL";
export const LOGIN_PASSWORD = "LOGIN_PASSWORD";

const signUpInitialState = {
  [SIGN_UP_EMAIL]: { value: "" },
  [SIGN_UP_PASSWORD]: { value: "" },
  [SIGN_UP_PASSWORD_CONFIRM]: { value: "" },
  formErrors: []
};

function signUp(state = signUpInitialState, action = {}) {
  switch (action.type) {
    case UPDATE_SIGNUP_FIELD: {
      return {
        ...state,
        [action.fieldName]: { value: action.value, isDirty: true }
      };
    }
    case BLUR_SIGNUP_FIELD: {
      return {
        ...state,
        [action.fieldName]: { ...state[action.fieldName], isDirty: true }
      };
    }
    case CREATE_USER_FULFILLED: {
      return signUpInitialState;
    }
    case SET_SIGNUP_FORM_ERRORS: {
      return { ...state, formErrors: action.messages };
    }
    default: {
      return state;
    }
  }
}

const loginInitialState = {
  [LOGIN_EMAIL]: { value: "" },
  [LOGIN_PASSWORD]: { value: "" },
  formErrors: []
};

function login(state = loginInitialState, action = {}) {
  switch (action.type) {
    case UPDATE_LOGIN_FIELD: {
      return {
        ...state,
        [action.fieldName]: { value: action.value, isDirty: true }
      };
    }
    case BLUR_LOGIN_FIELD: {
      return {
        ...state,
        [action.fieldName]: { ...state[action.fieldName], isDirty: true }
      };
    }
    case LOG_IN_USER_FULFILLED: {
      return signUpInitialState;
    }
    case SET_LOGIN_FORM_ERRORS: {
      return { ...state, formErrors: action.messages };
    }
    default: {
      return state;
    }
  }
}

export default combineReducers({
  signUp,
  login
});

export function updateSignupField(fieldName, value) {
  return {
    type: UPDATE_SIGNUP_FIELD,
    fieldName,
    value
  };
}

export function blurSignupField(fieldName) {
  return {
    type: BLUR_SIGNUP_FIELD,
    fieldName
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

function setSignupFormErrors(formErrors, messages) {
  return {
    type: SET_LOGIN_FORM_ERRORS,
    formErrors,
    messages
  };
}

function logInUserFulfilled(user) {
  return {
    type: LOG_IN_USER_FULFILLED,
    user
  };
}

function logInUserFailed(error) {
  return {
    type: LOG_IN_USER_FAILED,
    error
  };
}

export function updateLoginField(fieldName, value) {
  return {
    type: UPDATE_LOGIN_FIELD,
    fieldName,
    value
  };
}

export function blurLoginField(fieldName) {
  return {
    type: BLUR_LOGIN_FIELD,
    fieldName
  };
}

function setLoginFormErrors(formErrors, messages) {
  return {
    type: SET_LOGIN_FORM_ERRORS,
    formErrors,
    messages
  };
}

function validateCreateUser(user) {
  let formErrors = [];
  let messages = [];
  if (!user.email.match(EMAIL_REGEX)) {
    formErrors.push({ field: SIGN_UP_EMAIL });
    messages.push("Must provide a valid email address");
  }
  if (user.password.length < 8) {
    formErrors.push({ field: SIGN_UP_PASSWORD });
    messages.push("Password must be at least 8 characters");
  }
  if (user.password !== user.passwordConfirm) {
    formErrors.push({ field: SIGN_UP_PASSWORD });
    messages.push("Password and Password Confirmation must match");
  }
  return { formErrors, messages };
}

// THUNKS
const base = process.env.REACT_APP_HOST;

export function createUser(user) {
  return async dispatch => {
    const { formErrors, messages } = validateCreateUser(user);

    if (formErrors.length > 0) {
      return dispatch(setSignupFormErrors(formErrors, messages));
    }

    try {
      const response = await fetch(`${base}/register`, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });

      const createdUser = await response.json();

      return dispatch(createUserFulfilled(createdUser));
    } catch (err) {
      console.log(err);
      return dispatch(createUserFailed(err));
    }
  };
}

export function logInUser(user) {
  return async dispatch => {
    try {
      const response = await fetch(`${base}/authenticate`, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });

      const authenticatedUser = await response.json();

      return dispatch(logInUserFulfilled(authenticatedUser));
    } catch (err) {
      console.log(err);
      return dispatch(logInUserFailed(err));
    }
  };
}
