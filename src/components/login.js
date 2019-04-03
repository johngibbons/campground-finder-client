import React from "react";
import { connect } from "react-redux";
import { Form, Header, Message } from "semantic-ui-react";
import "./login.css";
import {
  logInUser,
  updateLoginField,
  blurLoginField,
  LOGIN_EMAIL,
  LOGIN_PASSWORD
} from "../modules/users";

const Login = ({
  email,
  formErrors,
  password,
  handleBlurField,
  handleUpdateField,
  handleLogInUser
}) => {
  return (
    <section className="login">
      <div className="login__form-container">
        <Header as="h1">Log In</Header>
        <Form
          onSubmit={() =>
            handleLogInUser({
              email: email.value,
              password: password.value
            })
          }
        >
          <Form.Input
            id="login-email"
            label="Email Address"
            onChange={(e, { value }) => handleUpdateField(LOGIN_EMAIL, value)}
            onBlur={() => handleBlurField(LOGIN_EMAIL)}
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
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              onChange={e => handleUpdateField(LOGIN_PASSWORD, e.target.value)}
              onBlur={() => handleBlurField(LOGIN_PASSWORD)}
              value={password.value}
              aria-describedby="login-password-rules"
            />
            <div id="login-password-rules" className="text-color--gray">
              Password must be at least 8 characters
            </div>
          </Form.Field>
          <Form.Button>Log in</Form.Button>
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
    email: state.users.login[LOGIN_EMAIL],
    password: state.users.login[LOGIN_PASSWORD],
    formErrors: state.users.login.formErrors
  };
};

export default connect(
  mapStateToProps,
  {
    handleLogInUser: logInUser,
    handleBlurField: blurLoginField,
    handleUpdateField: updateLoginField
  }
)(Login);
