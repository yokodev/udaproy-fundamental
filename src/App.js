import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import BookShelf from './bookshelf/BookShelf'

class App extends Component {
  state = {
    campo1 : "dos"
  }
  render() {
    return (
      <div className="App">
        <Route  path='/' render={(history)=>(
          <BookShelf history={history}/>
        )} />
      </div>
    );
  }
}

export default App;
