import React from 'react';
import ToDoHeader from './header';
import EntryForm from './entryform';
import Notes from './notes';


const todos = [
  {
    task: 'Sample Task 1',
    isCompleted: false

  },
  {
    task: 'Sample Task 2',
    isCompleted: true

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
      isCompleted: false
    })

    this.setState({ todos: this.state.todos });
  }

  deleteTask(task) {
    let taskList = this.state.todos;
    this.state.todos = taskList.filter( n => n.task !== task);
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
          <Notes todos={this.state.todos} deleteTask={this.deleteTask.bind(this)} />
        </div>
      </div>
    )
  }


}



