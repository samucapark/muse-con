import React, { Component, PropTypes } from 'react'
import Dashboard from './Dashboard'
import Navigation from './Navigation'
import { connect } from 'react-redux'
import popsicle from 'popsicle'

class App extends Component {

  render(){
    return(
      <div>
        <Navigation />
        { this.props.children }
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.object
}

function mapStateToProps(state) {
  return {state: state}
}

export default connect(mapStateToProps)(App)
