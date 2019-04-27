import React from "react";
import { Header, Form, Input } from "semantic-ui-react";

const CampsiteFinderCreation = () => {
  return (
    <section className="campsite-finder-creation">
      <Header as="h1">Create an Alert</Header>
      <Form>
        <Form.Field
          id="campsite-finder-creation-name-field"
          label="Name"
          placeholder="Enter a name for your Alert"
          required
        />
      </Form>
    </section>
  );
};

export default CampsiteFinderCreation;
