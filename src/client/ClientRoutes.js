import React from 'react'
import { Route } from 'react-router-dom'
import HomePageContainer from './containers/HomePageContainer.jsx';

export default () => (
  <div>
    <Route exact path='/' component={ HomePageContainer } />
  </div>
)
