import React from 'react';

export default class eachNote extends React.Component {

  render() {
    console.log(this);
    return(
        <li>
          <h3>{this.props.task}</h3>
          <button>Edit</button>
          <button>Delete</button>
        </li>
      )
  }
}
