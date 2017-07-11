import React from 'react'
import CampgroundCardContainer from '../containers/campground-card-container'
import AddCampgroundCard from '../components/add-campground-card'
import { Card } from 'semantic-ui-react'

const CampgroundsCollection = ({ campgrounds }) => {
  return (
    <Card.Group>
      {campgrounds.map((campground, i) =>
        <CampgroundCardContainer key={i} campground={campground} />
      )}
      <AddCampgroundCard />
    </Card.Group>
  )
}

export default CampgroundsCollection
