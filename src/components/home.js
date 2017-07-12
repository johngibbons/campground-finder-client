import React from 'react'
import './home.css'
import CampsiteFindersCollectionContainer from '../containers/campsite-finders-collection-container'
import CampgroundSearchContainer from '../containers/campground-search-container'
import { Container } from 'semantic-ui-react'

const Home = () => {
  return (
    <section className='home'>
      <Container>
        <CampgroundSearchContainer />
        <CampsiteFindersCollectionContainer />
      </Container>
    </section>
  )
}

export default Home
