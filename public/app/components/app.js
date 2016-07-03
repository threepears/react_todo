import React from 'react';
import ToDoHeader from './header';
import EntryForm from './entryform';
import Notes from './notes';


const todos = [
  {
    task: 'Sample Task 1',
    completed: false
  },
  {
    task: 'Sample Task 2',
    completed: true
  }
];


export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      todos
    };
  }

  addTask(task) {
    this.state.todos.push({
      task,
      completed: false
    })

    this.setState({ todos: this.state.todos });
  }

  deleteTask(task) {
    let taskList = this.state.todos;
    this.state.todos = taskList.filter( n => n.task !== task);
    this.setState({ todos: this.state.todos });
  }

  saveTask(oldTask, newTask) {
    let taskList = this.state.todos;
    let newList = taskList.map( n => {
      console.log("SAVING", oldTask);
      console.log("SAVING", newTask);
      if (n.task === oldTask) {
        console.log("MATCH");
        n.task = newTask;
      }
    });

    this.setState({ todos: this.state.todos });
  }

  render() {
    return (
      <div className='content'>
        <div className='content-left'>
          <ToDoHeader />
          <EntryForm addTask={this.addTask.bind(this)} />
        </div>
        <div className='content-right'>
          <Notes
            todos={this.state.todos}
            deleteTask={this.deleteTask.bind(this)}
            saveTask={this.saveTask.bind(this)}
          />
        </div>
      </div>
    )
  }


}



