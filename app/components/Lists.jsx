import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import { keyMaker } from '../helpers'

const Lists = ({userAuth, events}) => {
  const thirdParty = userAuth[userAuth.searchOpts.currSrc]

  return (
    <div className='third-party-widget col-md-2 col-md-offset-1'>
      <nav className='sidebar'>
          <h3>{userAuth.searchOpts.currSrc}</h3>
          <ul id='sidebar' className='nav nav-stacked'>
            {
              thirdParty.artists.map(each => 
                <li key={`#${keyMaker(each.name)}`}>
                  <span className='glyphicon glyphicon-equalizer'></span>
                  <a href={`#${keyMaker(each.name)}`}>{each.name}</a>
                  
                  <ul className='nav nav-stacked'>
                    {
                      events && events[keyMaker(each.name)] ? 
                      events[keyMaker(each.name)].map((eachEv, i) => <li key={`#${keyMaker(each.name)}${i}`}><a href={`#${keyMaker(each.name)}${i}`}>{eachEv.name}</a></li>) :
                      ''
                    }
                  </ul>
                </li>
              )
            }
          </ul>
      </nav>
    </div> 
  )
}

export default connect(null, actions)(Lists)
