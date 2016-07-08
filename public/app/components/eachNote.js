import React from 'react';

export default class eachNote extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        edit: false
    };
  }

  // If completed button clicked, sends current task name and completed status to toggle function on main app.js file
  completed() {
    let currentTask = this.props.task;
    let currentState = this.props.complete;
    this.props.completeToggle(currentTask, currentState);
  }

  editTask() {
    this.setState({ edit: true });
    console.log(this);
  }

  cancelEdit() {
    this.setState({ edit: false });
  }

  // Sends edited task name and old task name to function on main app.js document to be saved to database
  saveEditedTask() {
    let oldValue = this.props.task;
    let newValue = this.refs.editInfo.value;
    this.props.saveTask(oldValue, newValue);
    this.setState({ edit: false });
  }

  // If in editing mode, renders input box for typing new task name; if not, just renders old task name
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

  // Creates set of buttons to render to DOM depending on whether edit option has been selected; determines if task is completed and adds class for styling to div
  buttonListing() {
    let completedState = (this.props.complete === "true") ? "completeButtons" : "incompleteButtons";

    if (this.state.edit) {
      return (
        <div className={completedState}>
          <button onClick={this.saveEditedTask.bind(this)}>Save</button>
          <button onClick={this.cancelEdit.bind(this)}>Cancel</button>
          <button onClick={this.completed.bind(this)}>Completed</button>
        </div>
      );
    } else {
      return (
        <div className={completedState}>
          <button onClick={this.editTask.bind(this)}>Edit</button>
          <button onClick={this.props.deleteTask.bind(this, this.props.task)}>Delete</button>
          <button onClick={this.completed.bind(this)}>Completed</button>
        </div>
      );
    }
  }

  render() {
    let completedState = (this.props.complete === "true") ? "complete" : "";
    let checkedState = (this.props.complete === "true") ? "checked" : "unchecked";
    return(
        <li className={completedState}>
          <div className={checkedState}>✓</div>
          {this.taskListing()}
          {this.buttonListing()}
        </li>
      )
  }
}
