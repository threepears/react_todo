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

  render() {
    return (
      <div className='content'>
        <div className='content-left'>
          <ToDoHeader />
          <EntryForm addTask={this.addTask.bind(this)} />
        </div>
        <div className='content-right'>
          <Notes todos={this.state.todos} />
        </div>
      </div>
    )
  }

  addTask(task) {
    console.log(task);
    console.log(this);

    this.state.todos.push({
      task,
      isCompleted: false
    })

    this.setState({ todos: this.state.todos });
  }

}



