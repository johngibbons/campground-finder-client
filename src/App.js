import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import Home from './components/home'
import { Container } from 'semantic-ui-react'
import './App.css'

class App extends Component {
  render () {
    return (
      <div className='app'>
        <header className='app__header'>
          <Container>
            <Link className='app__header-logo' to='/'>
              Campground Finder
            </Link>
          </Container>
        </header>
        <main>
          <Route exact path='/' component={Home} />
        </main>
      </div>
    )
  }
}

export default App
