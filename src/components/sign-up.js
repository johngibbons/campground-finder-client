import React from "react";
import { connect } from "react-redux";
import { Form, Header, Message } from "semantic-ui-react";
import "./sign-up.css";
import {
  createUser,
  updateField,
  blurField,
  SIGN_UP_EMAIL,
  SIGN_UP_PASSWORD,
  SIGN_UP_PASSWORD_CONFIRM
} from "../modules/users";

const SignUp = ({
  email,
  formErrors,
  password,
  passwordConfirm,
  handleBlurField,
  handleUpdateField,
  handleCreateUser
}) => {
  return (
    <section className="sign-up">
      <div className="sign-up__form-container">
        <Header as="h1">Sign Up</Header>
        <Form
          onSubmit={() =>
            handleCreateUser({
              email: email.value,
              password: password.value,
              passwordConfirm: passwordConfirm.value
            })
          }
        >
          <Form.Input
            id="sign-up-email"
            label="Email Address"
            onChange={(e, { value }) => handleUpdateField(SIGN_UP_EMAIL, value)}
            onBlur={() => handleBlurField(SIGN_UP_EMAIL)}
            placeholder="john@sample.com"
            type="email"
            value={email.value}
            error={email.isDirty && !email.value}
            required
          />
          <Form.Field
            required
            error={password.isDirty && password.value.length < 8}
          >
            <label htmlFor="sign-up-password">Password</label>
            <input
              id="sign-up-password"
              type="password"
              onChange={e =>
                handleUpdateField(SIGN_UP_PASSWORD, e.target.value)
              }
              onBlur={() => handleBlurField(SIGN_UP_PASSWORD)}
              value={password.value}
              aria-describedby="sign-up-password-rules"
            />
            <div id="sign-up-password-rules" className="text-color--gray">
              Password must be at least 8 characters
            </div>
          </Form.Field>
          <Form.Input
            id="sign-up-password-confirm"
            label="Confirm Password"
            onChange={(e, { value }) =>
              handleUpdateField(SIGN_UP_PASSWORD_CONFIRM, value)
            }
            onBlur={() => handleBlurField(SIGN_UP_PASSWORD_CONFIRM)}
            type="password"
            value={passwordConfirm.value}
            error={passwordConfirm.isDirty && passwordConfirm.value.length < 8}
            required
          />
          <Form.Button>Sign up</Form.Button>
          <Message
            error
            header="There was some errors with your submission"
            list={formErrors}
            visible={formErrors.length > 0}
          />
        </Form>
      </div>
    </section>
  );
};

const mapStateToProps = state => {
  return {
    email: state.users.signUp[SIGN_UP_EMAIL],
    password: state.users.signUp[SIGN_UP_PASSWORD],
    passwordConfirm: state.users.signUp[SIGN_UP_PASSWORD_CONFIRM],
    formErrors: state.users.signUp.formErrors
  };
};

export default connect(
  mapStateToProps,
  {
    handleCreateUser: createUser,
    handleBlurField: blurField,
    handleUpdateField: updateField
  }
)(SignUp);
