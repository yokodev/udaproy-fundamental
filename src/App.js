import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import BookShelf from './bookshelf/BookShelf'
import SearchBar from './bookshelf/SearchBar'
import * as BookApi from './utils/BooksAPI'
import './App.css'

class App extends Component {
  state = {
    query: '',
    books: [],
    querybooks: []
  }

  componentDidMount() {
    this.getAllBooks()
  }

  getAllBooks = () => {
    BookApi.getAll()
      .then(data => {
        // console.log('getAll:', data)
        this.setState({ books: data })
      })
      .catch(error => console.log(error))
  }

  filterBooksbyShelf(books = []) {
    let cr = [], wr = [], r = []
    for (let book of books) {
      book.shelf === 'currentlyReading' && cr.push(book)
      book.shelf === 'wantToRead' && wr.push(book)
      book.shelf === 'read' && r.push(book)
    }
    return [cr, wr, r]
  }

  createShelfs = () => this.filterBooksbyShelf(this.state.books)

  moveToShelf = (book, from, to) => {
    BookApi.update(book, to)
      .then(data => {
        console.log('data de update ', data)
      })
      .then(() => this.getAllBooks())
      .catch(error => console.log('error ', error))
  }


  joinQueryShelf = (shelf, queryresults) => {
    let joinMap = new Map()
    for (let book of shelf) {
      joinMap.set(book.id, book)
    }
    for (let book of queryresults) {
      !joinMap.has(book.id) && joinMap.set(book.id, book)
    }
    console.log(`joinMap VALUES ${joinMap.values()}`)
    console.log(joinMap)
    return joinMap
  }

  exeQueryShelf = () =>
    this.joinQueryShelf(this.state.books, this.state.querybooks)

  executeQuery = query => {
    BookApi.search(query, 10)
      .then(data => {
        console.log(`data received ${JSON.stringify(data)}`)
        return this.setState({ querybooks: data })
      })
      .catch(err => console.log(`Error : ${err}`))
  }
  
  updateQuery = query => {
    this.setState({ query: query })
    if (this.state.query) this.executeQuery(this.state.query)
    // console.log(`querybooks: ${this.state.querybooks}`);
  }

  render() {
    let { query, querybooks, books } = this.state
    console.log('querybooks ',querybooks);
    return (
      <div className="App">
        <Route exact path="/search" render={history =>
          <SearchBar
            query={query}
            // books={this.exeQueryShelf()}
            books={books}
            queryBooks={querybooks}
            onMoveToShelf={this.moveToShelf}
            onQueryChange={this.updateQuery}
          />}
        />
        <Route exact path="/" render={history =>
            <BookShelf
              history={history}
              books={this.createShelfs()}
              onMoveToShelf={this.moveToShelf}
            />}
        />
      </div>
    )
  }
}

export default App
