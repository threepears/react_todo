import React from 'react';
import EachNote from './eachNote'

export default class Notes extends React.Component {

  listItems() {
    let taskList = this.props.todos;
    console.log(this);
    console.log(taskList);
    var list = taskList.map( (n, index) => <EachNote key={index} task={n.task} complete={n.completed} {...this.props} /> );
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
