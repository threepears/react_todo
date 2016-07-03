import React from 'react';

export default class eachNote extends React.Component {

  editTask(){
    console.log("EDIT");
  }

  render() {
    console.log(this);
    return(
        <li>
          <h3>{this.props.task}</h3>
          <button onClick={this.editTask.bind(this)}>Edit</button>
          <button onClick={this.props.deleteTask.bind(this, this.props.task)}>Delete</button>
        </li>
      )
  }
}
