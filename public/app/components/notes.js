import React from 'react';
import EachNote from './eachNote'

export default class Notes extends React.Component {

  // Render task list out into DOM
  listItems() {
    let taskList = this.props.todos;
    console.log(taskList);
    console.log(this);
    var list = taskList.map( (n, index) => <EachNote key={index} task={n.taskname} complete={n.iscompleted} {...this.props} /> );
    return list;
  }

  render() {
    console.log(this);
    return(
        <div>
          <ul>
            {this.listItems()}
          </ul>
        </div>
      )
  }

}
