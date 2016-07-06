import React from 'react';
import ToDoHeader from './header';
import EntryForm from './entryform';
import Notes from './notes';


export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {todos: []};
  }

  componentDidMount() {
    console.log("MOUNTING");
    this.fetchTasks();
  }

  fetchTasks() {
    fetch('/tasks', {method: 'GET'})
      .then((response) => response.json())
      .then((responseData) => {
        console.log("FETCHING", responseData);
        this.setState({todos: responseData});
      })
      .catch((err) => {
        throw new Error(err);
      }).bind(this);
  }

  addTask(task) {
    fetch('/tasks/' + task, {method: 'POST'})
      .then((response) => response.json())
      .then((responseData) => {
        console.log("ADDING", responseData);
        this.fetchTasks();
      })
      .catch((err) => {
        throw new Error(err);
      });

    this.setState({ todos: this.state.todos });
  }

  completeToggle(currentTask) {
    console.log(this);
    let taskList = this.state.todos;
    let newList = taskList.map( n => {
      if (n.task === currentTask) {
        n.completed = !n.completed;
      }
    });

    this.setState({ todos: this.state.todos });
  }

  deleteTask(task) {
    fetch('/tasks/' + task, {method: 'DELETE'})
      .then((response) => response.json())
      .then((responseData) => {
        console.log("DELETING", responseData);
        this.fetchTasks();
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  saveTask(oldTask, newTask) {
    let taskList = this.state.todos;
    let newList = taskList.map( n => {
      if (n.task === oldTask) {
        n.task = newTask;
      }
    });

    this.setState({ todos: this.state.todos });
  }

  render() {
    console.log(this);
    return (
      <div className='content'>
        <div className='content-left'>
          <ToDoHeader />
          <EntryForm addTask={this.addTask.bind(this)} todos={this.state.todos} />
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
