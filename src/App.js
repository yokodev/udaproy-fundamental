import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import BookShelf from './bookshelf/BookShelf'
import SearchBar from './bookshelf/SearchBar'
import * as BookApi from './utils/BooksAPI'

class App extends Component {
  state = {
    query:' ',
    books:[],
  }
  updateQuery = (query)=>{
    this.setState({query:query.trim()})
    if(this.state.query)
    this.executeQuery(this.state.query);
  }
  executeQuery(query){
    BookApi.search(query, 10)
    .then((data)=>{
      console.log(`data received ${JSON.stringify(data)}`)
      return this.setState({books:data})
    })
    .catch((err)=>console.log(`Error : ${err}`))
  }
  render() {
    let {query, books}= this.state
    return (
      <div className="App">
        <Route exact path='/' render={(history)=>(
          <BookShelf history={history}/>
        )} />
        <Route exact path='/search' render={(history)=>(
          <SearchBar query={query} books={books} onQueryChange={this.updateQuery}/>
        )}/>
      </div>
    );
  }
}

export default App;
