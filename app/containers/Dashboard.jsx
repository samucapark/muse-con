import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import Badge from '@material-ui/core/Badge';
import { CalendarTodayTwoTone } from '@material-ui/icons';
import EventContain from './EventContain'
import { getUserEvents, saveEvent } from '../actions'
import Spotify from '../components/Spotify'
import { loadEvents } from '../actions'
import { locateUser } from '../helpers'
import Lists from '../components/Lists'
import Navbar from '../components/Navbar'
import EventBlock from '../components/EventBlock'

class Dashboard extends Component {
  // to touch nested children of state tree,
  // assign new properties to highest affected level,
  // then reassign to state by using same key
  
  componentDidMount() {
    //if (!this.props.userAuth.lat || !this.props.userAuth.long) {
    //  locateUser(this.props.userAuth)
    //    .then(res => {
    //      this.props.actions.locationFound(res)
    //    })
    //}
    //this.props.dispatch({ type: 'LOADED_USER_EVENTS', payload: [] });
    this.props.getUserEvents(this.props.userAuth);
  }

  componentDidUpdate(prevProps) {
  }
  render(){
    let checkUser = (user) => {
      if (!user.thirdParties || user.thirdParties.length === 0) {
        return <span className='label label-warning'><Link to='/user'>Link your Spotify Account</Link></span>
      } else if(this.props.events && this.props.events.length !== 0) {
        return <h6 style={{textTransform:'lowercase',marginLeft:'2%'}}>Upcoming Events<Badge badgeContent={this.props.events.length} color='secondary'><CalendarTodayTwoTone /></Badge></h6>
      } else return <h6>No upcoming events <Link to='/explore'>search for events</Link></h6>
    } 

    return (
      <div className='container-fluid content-container'>
        {checkUser(this.props.userAuth)}
        <div className='row'>
          <EventBlock {...this.props} /> 
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  events: state.user.events,
})

export default connect(mapStateToProps, { getUserEvents, saveEvent })(Dashboard)
