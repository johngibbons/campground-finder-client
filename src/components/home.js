import React from 'react'
import './home.css'
import CampgroundsCollectionContainer from '../containers/campgrounds-collection-container'
import { Container } from 'semantic-ui-react'

const Home = () => {
  return (
    <section>
      <Container>
        <CampgroundsCollectionContainer />
      </Container>
    </section>
  )
}

export default Home
