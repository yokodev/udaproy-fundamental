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
        this.setState({ books: data })
      })
      .catch(error => console.log(error))
  }

  /**
   * filterBooksbyShelf - Filter the books in the state according to its shelf
   *
   * @param {array} [books=[]] Description
   *
   * @return {arrary} One shelf array per category (currentlyReading, wantToRead, read)
   */
  filterBooksbyShelf(books = []) {
    let cr = [],
      wr = [],
      r = []
    for (let book of books) {
      book.shelf === 'currentlyReading' && cr.push(book)
      book.shelf === 'wantToRead' && wr.push(book)
      book.shelf === 'read' && r.push(book)
    }
    return [cr, wr, r]
  }

  /**
    * createShelfs - Helper function for creating the shelfs according to the books state
    *
    * @return {array} filtered shelfs
    */
  createShelfs = () => this.filterBooksbyShelf(this.state.books)

  /**
   * moveToShelf - Moves a book between shelfs
   * @param {type} book The Book
   * @param {type} from from shelf
   * @param {type} to   to Shelf
   */
  moveToShelf = (book, from, to) => {
    BookApi.update(book, to)
      .then(data => {
        console.log('data de update ', data)
      })
      .then(() => this.getAllBooks())
      .catch(error => console.log('error ', error))
  }

  /**
  * joinQueryShelf - Joins/concats the mainShelf with the books comming from the query
  *
  * @param {type}  mainShelf         Books in the mainShelf. All tree (currentlyReading, wantToRead, read)
  * @param {array} [queryresults=[]] Books comming from the API via query
  *
  * @return {array} Returns an array of the combination of books between the mainShelf and the queryresults
  */
  joinQueryShelf = (mainShelf, queryresults = []) => {
    let joinMap = new Map()
    for (let book of mainShelf) {
      joinMap.set(book.id, book)
    }
    for (let book of queryresults) {
      !joinMap.has(book.id) && joinMap.set(book.id, book)
    }
    return Array.from(joinMap.values())
  }

  /**
   * exeQueryShelf - Helper function for joinQueryShelf
   */
  exeQueryShelf = () => this.joinQueryShelf(this.state.books, this.state.querybooks)

  /**
  * executeQuery - Execute the query according to the input in the SearchBar
  *
  * @param {type} query String with the search query
  *
  * @return {type} sets the querybooks state
  */
  executeQuery = query => {
    BookApi.search(query, 10)
      .then(data => {
        this.setState({ querybooks: data })
        return this.state.querybooks
      })
      .then(data => console.log(`the data afer executeQuery ${data}`))
      .catch(err => console.log(`Error : ${err}`))
  }

  /**
   * updateQuery - Helper function for the executeQuery function
   */
  updateQuery = query => {
    this.setState({ query: query.trim() })
    if (this.state.query) this.executeQuery(this.state.query)
  }

  render() {
    let { query, querybooks, books } = this.state
    console.log('querybooks ', querybooks)
    return (
      <div className="App">
        <Route exact path="/search" render={history =>
            <SearchBar
              query={query}
              books={books}
              joinedBooks={this.exeQueryShelf()}
              queryBooks={querybooks}
              onMoveToShelf={this.moveToShelf}
              onQueryChange={this.updateQuery}
            />}
        />
        <Route exact path="/" render={history =>
            <BookShelf history={history} books={this.createShelfs()} onMoveToShelf={this.moveToShelf} />}
        />
      </div>
    )
  }
}

export default App
