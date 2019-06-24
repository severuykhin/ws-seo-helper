import React, { Component } from 'react'
import { connect } from 'react-redux'
import ClientRoutes from '../../ClientRoutes'
import Story from '../Story.jsx';

const styles = {
  'padding': '30px'
}

class App extends Component {
  render() {
    return (
      <div style={ styles } className='App'>
        <ClientRoutes />
        <Story />
      </div>
    )
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(App);
