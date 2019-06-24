import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setStory, setStateData } from '../redux/actions/reports';

class Story extends Component {

  componentDidMount() {
    if(BROWSER) {
      let story = localStorage.getItem('ws-story');
      if (story) this.props.setStory(JSON.parse(story));
    }
  }

  applyStoryItem(index) {
    this.props.setStateData(index);
  }

  render() {
    return (
      <div className="app-story" style={{ 'width': '500px' }}>
        <br/>
        { this.props.story.map((item, index) => {
          return (
            <a
              onClick={ () => { this.applyStoryItem(index) } }
              key={ `story-item-${index}` } 
              className='button is-fullwidth'>{ item.timestamp }</a>
          );
        }) }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  story: state.reports.story
});

const mapDispatchToProps = (dispatch) => ({
  setStory: (data) => { dispatch(setStory(data)) },
  setStateData: (index) => { dispatch(setStateData(index)) }
});

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Story);
