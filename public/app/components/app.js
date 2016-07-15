import React from 'react';
import ToDoHeader from './header';
import EntryForm from './entryform';
import Notes from './notes';


export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {todos: [], error: ""};
  }

  componentDidMount() {
    console.log("MOUNTING");
    this.fetchTasks();
  }

  // Get initial tasks from database
  fetchTasks() {
    fetch('/tasks', {method: 'GET'})
      .then((response) => response.json())
      .then((responseData) => {
        console.log("FETCHING", responseData);
        this.setState({todos: responseData});
      })
      .catch((err) => {
        this.setState({error: "Couldn't access database. Try again later!"});
        // throw new Error(err);
      });
  }

  // Add task to database
  addTask(task) {
    const { todos } = this.state;
    this.setState({todos: todos.concat({iscompleted: "false", taskname: task})});
    fetch('/tasks/' + task, {method: 'POST'})
      .then((responseData) => {
        console.log("ADDING", responseData);
        this.fetchTasks();
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  // Toggle task's completed status and save to database
  completeToggle(currentTask, currentState) {
    fetch('/tasks/complete/' + currentTask + '/' + currentState, {method: 'PUT'})
      .then((responseData) => {
        console.log("UPDATE COMPLETION", responseData);
        this.fetchTasks();
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  // Delete task from database
  deleteTask(task) {
    fetch('/tasks/' + task, {method: 'DELETE'})
      .then((responseData) => {
        console.log("DELETING", responseData);
        this.fetchTasks();
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  // Save an edited task name to database
  saveTask(oldTask, newTask) {
    fetch('/tasks/edit/' + oldTask + '/' + newTask, {method: 'PUT'})
      .then((responseData) => {
        console.log("UPDATE COMPLETION", responseData);
        this.fetchTasks();
      })
      .catch((err) => {
        throw new Error(err);
      });
  }


  render() {
    return (
      <div className='content'>
        <div className='content-left'>
          <ToDoHeader />
          <EntryForm addTask={this.addTask.bind(this)} error = {this.state.error} todos={this.state.todos} />
        </div>
        <div className='content-right'>
          <Notes
            url="/tasks"
            todos={this.state.todos}
            deleteTask={this.deleteTask.bind(this)}
            saveTask={this.saveTask.bind(this)}
            completeToggle={this.completeToggle.bind(this)}
          />
        </div>
      </div>
    )
  }
}
