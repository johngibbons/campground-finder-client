import React from "react";
import CampsiteFinderCardContainer from "../containers/campsite-finder-card-container";
import { Dimmer, Loader, Card, Message, Container } from "semantic-ui-react";

const CampsiteFindersCollection = ({ campsiteFinders, isLoaded, isError }) => {
  return isError ? (
    <Container text>
      <Message
        error
        content="Oops! There was an error fetching your campsite finders. Please try refreshing the page."
      />
    </Container>
  ) : (
    <Card.Group itemsPerRow={3} stackable>
      <Dimmer active={!isLoaded} page inverted>
        <Loader inverted active={!isLoaded} disabled={isLoaded} />
      </Dimmer>
      {campsiteFinders.map(campsiteFinder => (
        <CampsiteFinderCardContainer
          key={campsiteFinder._id}
          campsiteFinder={campsiteFinder}
        />
      ))}
    </Card.Group>
  );
};

export default CampsiteFindersCollection;
