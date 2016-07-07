import React from 'react';

export default class EntryForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        error: null
    };
  }

  // Submit tasks to add to list; checks for empty or duplicate tasks
  submitTask(e) {
    e.preventDefault();
    let newTask = this.refs.inputInfo.value;

    let taskCheck = newTask.toLowerCase();
    let tasks = this.props.todos;
    console.log(tasks);
    let taskSearch = tasks.filter( n => n.taskname.toLowerCase() === taskCheck );

    console.log(this);
    console.log(taskCheck);
    console.log(taskSearch.length);

    if (newTask === '') {
      this.refs.inputInfo.value = '';
      this.state.error = "Please enter a task!";
      this.setState({ error: this.state.error });
      return;
    } else if (taskSearch.length > 0) {
      this.refs.inputInfo.value = '';
      this.state.error = "This task already exists!";
      this.setState({ error: this.state.error });
      return;
    } else {
      this.state.error = null;
      this.props.addTask(newTask);
      this.refs.inputInfo.value = '';
    }
  }

  render() {
    return(
      <div>
        <div className="error">{this.state.error}</div>
        <form onSubmit={this.submitTask.bind(this)}>
          <input type='text' placeholder='Enter task here' ref="inputInfo" />
          <button>Create</button>
        </form>
      </div>
      )
  }

}
