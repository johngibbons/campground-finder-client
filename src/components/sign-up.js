import React from "react";
import "./sign-up.css";
import { Form } from "semantic-ui-react";

const SignUp = () => {
  return (
    <section className="sign-up">
      <h1>Sign Up</h1>
      <Form>
        <Form.Input
          id="sign-up-email"
          label="Email Address"
          placeholder="sample@gmail.com"
          type="email"
        />
        <Form.Input id="sign-up-password" label="Password" type="password" />
        <Form.Input
          id="sign-up-password-confirm"
          label="Confirm Password"
          type="password"
        />
        <Form.Button>Sign up</Form.Button>
      </Form>
    </section>
  );
};

export default SignUp;
