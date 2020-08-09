import React, { Component } from 'react';

class App extends Component {
  state = {
    todos: []
  };
  async componentDidMount() {
    try {
      const res = await fetch('http://127.0.0.1:8000/rest1/info/'); // fetching the data from api, before the page loaded
      const todos = await res.json();
      console.log(todos)
      this.setState({
        todos
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div>
        <h1>this is wow sections</h1>
        {this.state.todos.map(item => (
          <div key={item.id}>
            <h1>{item.name}</h1>
            <span>{item.address}</span>
          </div>
        ))}
      </div>
    );
  }
}

export default App;