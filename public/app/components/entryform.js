import React from 'react';

export default class EntryForm extends React.Component {

  render() {
    return(
        <form onSubmit={this.submitTask.bind(this)}>
          <input type='text' placeholder='Enter task here' ref="inputInfo" />
          <button>Create</button>
        </form>
      )
  }

  submitTask(e) {
    e.preventDefault();

    let newTask = this.refs.inputInfo.value;
    this.props.addTask(newTask);
    this.refs.inputInfo.value = '';
  }

}
