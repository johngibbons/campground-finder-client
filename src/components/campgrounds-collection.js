import React from 'react'
import CampgroundCardContainer from '../containers/campground-card-container'
import { Card } from 'semantic-ui-react'

const CampgroundsCollection = ({ campgrounds }) => {
  return (
    <Card.Group>
      {campgrounds.map((campground, i) =>
        <CampgroundCardContainer key={i} campground={campground} />
      )}
    </Card.Group>
  )
}

export default CampgroundsCollection
