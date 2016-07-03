import React from 'react';

export default class eachNote extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        edit: false
    };
  }

  editTask() {
    this.setState({ edit: true });
    console.log(this);
  }

  cancelEdit() {
    this.setState({ edit: false });
  }

  saveEditedTask() {
    let oldValue = this.props.task;
    let newValue = this.refs.editInfo.value;
    this.props.saveTask(oldValue, newValue);
    this.setState({ edit: false });

  }

  taskListing() {
    if (this.state.edit) {
      return (
        <form className="edit-box" onSubmit={this.saveEditedTask.bind(this)}>
          <input type='text' defaultValue={this.props.task} ref="editInfo" />
        </form>
      );
    } else {
      return (
        <h3>{this.props.task}</h3>
      );
    }
  }

  buttonListing() {
    if (this.state.edit) {
      return (
        <div>
          <button onClick={this.saveEditedTask.bind(this)}>Save</button>
          <button onClick={this.cancelEdit.bind(this)}>Cancel</button>
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={this.editTask.bind(this)}>Edit</button>
          <button onClick={this.props.deleteTask.bind(this, this.props.task)}>Delete</button>
        </div>
      );
    }
  }

  render() {
    console.log(this);
    return(
        <li>
          {this.taskListing()}
          {this.buttonListing()}
        </li>
      )
  }
}
