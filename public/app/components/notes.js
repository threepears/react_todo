import React from 'react';
import EachNote from './eachNote'

export default class Notes extends React.Component {

  // constructor(props) {
  //   super(props);

  //   this.state = {items: []};
  // }

  // componentDidMount() {
  //   fetch('/tasks', {method: 'GET'})
  //     .then((response) => response.json())
  //     .then((responseData) => {
  //       console.log("FETCHING", responseData);
  //       this.setState({items: responseData});
  //     })
  //     .catch((err) => {
  //       throw new Error(err);
  //     });
  // }

  listItems() {
    let taskList = this.props.todos;
    console.log(taskList);
    // let stateItems = this.state.todos;
    // console.log(stateItems);
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
