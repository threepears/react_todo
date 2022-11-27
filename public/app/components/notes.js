import React from 'react';
import EachNote from './eachNote'

export default class Notes extends React.Component {

  // Render task list out into DOM
  listItems() {
    let taskList = this.props.todos;
    var list = taskList.sort((a, b) => b.id - a.id).map( (n, index) => <EachNote key={index} task={n.taskname} complete={n.iscompleted} {...this.props} /> );
    return list;
  }


  render() {
    return(
        <div>
          <ul>
            {this.listItems()}
          </ul>
        </div>
      )
  }
}
