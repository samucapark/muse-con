import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { keyMaker } from '../helpers'
import Button from '@material-ui/core/Button';
import { CheckBoxTwoTone, CheckBoxOutlineBlankTwoTone } from '@material-ui/icons'

//TODO: change to list component

const Lists = (props) => {
  const { userAuth, events, loading, actions, searchList } = props
  const thirdParty = userAuth[userAuth.searchOpts ? userAuth.searchOpts.currSrc : ''] || {},
        listStyle = {
          listStyleType: 'none',
          paddingLeft: '0'
        }

  //let isSelected = thirdParty.artists.find(each => each.exclude)

  let btnSelector = (evObj) => {
    if (evObj.exclude) {
      return 
    } else return  
  } 

  let btnStyle = {
    padding:'0.5em'
  }

  let isExcluded = (item) => searchList.find(each => each.name === item.name).exclude
  let checkCount = (each) => events[keyMaker(each.name)].length
  let checkList = () => searchList ? searchList.filter(item => !item.exclude).length : null;
  let temp = checkList();

  return (
    <div className='third-party-widget col-sm-2'>
      <div className='row'>  
      {/* make this dropdown for sources of search */}

      {
        /explore/.test(props.location.pathname) ? 
          <Button
            variant='contained'
            color='secondary'
            onClick={() => actions.loadEvents(userAuth, searchList)}
            disabled={temp === null || temp === 0}
            style={{margin:'1em'}}>
            Search
          </Button>
        : ''
      }

      {/* make this dropdown for current identifier for artists */}
      {
        checkList() ? 
          <Button
            variant='contained'
            color='secondary'
            onClick={() => actions.toggleArtist(true, searchList)}
            style={{margin:'1em'}}>
            Remove All
          </Button>
          : <Button
            variant='contained'
            color='secondary'
            onClick={() => actions.toggleArtist(false, searchList)}
            style={{margin:'1em'}}>
            Add All
          </Button>
      }

      { events && events.length !== 0 ? 
          <Button
            variant='contained'
            color='secondary'
            onClick={() => actions.loadedEvents({})}
            style={{display:'block', margin:'1em'}}>
            Clear Search
          </Button>
          : null 
      }
      <h5 style={{margin:'8% auto 2% auto'}}>artists selected: {temp}</h5>
      <hr></hr>
    </div>
    <div className='row'>
        {
          searchList ?
            searchList.map((each, i) => 
              <div key={`${each.name}`} 
                className={`panel-group${events && events[keyMaker(each.name)] && events[keyMaker(each.name)].length > 0 ? '' : ' no-evs'}`}
                id='accordion'
                role='tablist' 
                aria-multiselectable='true'>
                <div className='panel-heading' id={`heading${i}`} role='tab'>
                  { isExcluded(each) ? 
                      <CheckBoxOutlineBlankTwoTone
                        className='clickable'
                        onClick={() => actions.toggleArtist(each, searchList)} />
                      :
                      <CheckBoxTwoTone
                        className='clickable'
                        onClick={() => actions.toggleArtist(each, searchList)} />
                  }

                  <h4 className='panel-title search-list-title'>
                    <a role='button'
                       data-toggle='collapse'
                       data-parent='#accordion' 
                       href={`#collapse${i}`} 
                       aria-expanded='false' 
                       aria-controls={`collapse${i}`}
                       >
                      {each.name}
                    </a>
                  </h4>
                  {events && events[keyMaker(each.name)] ? <p className="ev-count">({checkCount(each)})</p> : null}
                </div>
                <div id={`collapse${i}`} className='panel-collapse collapse search-list-events' role='tabpanel' aria-labelledby={`heading${i}`}>
                  <div className='panel-body' style={{border:'none'}}>
                    <ul className='nav nav-stacked'>
                      {
                        events && events[keyMaker(each.name)] && events[keyMaker(each.name)].length > 0 ? 
                        events[keyMaker(each.name)].map((eachEv, i) => <li key={`#${keyMaker(each.name)}${i}`}><a href={`#${keyMaker(each.name)}${i}`}>{eachEv.name}</a></li>)
                        : ''
                      }
                    </ul>
                  </div>
                </div>
              </div>
          ) : ''
        }
      </div>
    </div> 
  )
}

export default Lists
