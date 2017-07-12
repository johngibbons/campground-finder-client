import React from 'react'
import CampsiteFinderCardContainer from '../containers/campsite-finder-card-container'
import { Card } from 'semantic-ui-react'

const CampsiteFindersCollection = ({ campsiteFinders }) => {
  return (
    <Card.Group>
      {campsiteFinders.map((campsiteFinder, i) =>
        <CampsiteFinderCardContainer key={i} campsiteFinder={campsiteFinder} />
      )}
    </Card.Group>
  )
}

export default CampsiteFindersCollection
