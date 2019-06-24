import React, { Component } from 'react'

export default class Textarea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    }
  }

  handleInput = (e) => {
    let values = e.target.value;
    this.props.onInput(values, this.props.id);
  }

  render() {

    let value = this.props.value ? this.props.value : '';

    return (
      <div className={ `control ${this.state.loading ? 'loading' : ''}` }>
        <textarea 
          value={ value } 
          onChange={ this.handleInput }
          className='textarea' 
          placeholder={ this.props.placeholder } />
      </div>
    )
  }
}
