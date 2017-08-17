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
    joinedbooks: []
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
   * filterBooksbyShelf - Filter the books from the state according to its shelf name
   *
   * @param {array} books books comming from this.state.books
   *
   * @return {arrary} One shelf array per category (currentlyReading, wantToRead, read)
   */
  filterBooksbyShelf(books = []) {
    let cr = [], wr = [], r = []
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
   * @param {object} book The Book
   * @param {string} to   to Shelf
   */
  moveToShelf = (book, to) => {
    BookApi.update(book, to)
      .then(data => {
        this.getAllBooks()
      })
      .catch(error => console.log('error ', error))
  }

  /**
   * changeBooksIds - search for a repeated book within the querybooks
   *
   * @param {array} [books=[]]  array of books currently in the shelfs
   * @param {array} [qBooks=[]] array of books from the query via API
   *
   * @return {array} books from the query with modified shelf, if found
   */
  changeBooksIds = (books = [], qBooks = []) => {
    for (let book of books) {
      for (let qBook of qBooks) {
        (book.id === qBook.id) && (qBook.shelf = book.shelf)
        }
      }
    return qBooks
  }

  /**
  * joinBooksQuery - Joins/concats the mainShelf with the books comming from the query
  *
  * @param {array}  mainShelf       Books in the mainShelf. All tree (currentlyReading, wantToRead, read)
  * @param {array}  queryresults    Books comming from the API via query
  *
  * @return {array} Returns an array of the combination of books between the mainShelf and the queryresults
  */

  joinBooksQuery = (mainShelf = [], queryresults = []) => {
    mainShelf.length > 0 || queryresults.length > 0
      ? this.setState({ joinedbooks: this.changeBooksIds(mainShelf, queryresults) })
      : this.setState({ joinedbooks: [] })
  }

  /** executeQuery - Execute the query according to the input in the SearchBar
  *
  * @param {string} query String with the search query
  */
  executeQuery = query => {
    BookApi.search(query)
      .then(data => {
        data.error && data.items.length === 0 ? this.resetJoinedBooks() : this.joinBooksQuery(this.state.books, data)
      })
      .catch(err => console.log(`Error : ${err}`))
  }

  /**
   * updateQuery - Helper function for the executeQuery function
   */
  updateQuery = query => {
    if (query && query !== '') {
      this.setState({ query: query.trim() })
      this.executeQuery(this.state.query)
    }
    this.setState({ query: '', joinedbooks: [] })
  }

  resetJoinedBooks = () => {
    this.setState({ joinedbooks: [] })
  }

  render() {
    const { moveToShelf, updateQuery, resetJoinedBooks, state: { joinedbooks } } = this
    return (
      <div className="App">
        <Route exact path="/" render={() =>
          <BookShelf resetJoinedBooks={resetJoinedBooks} books={this.createShelfs()} onMoveToShelf={moveToShelf} />}
        />
        <Route  exact path="/search" render={() =>
          <SearchBar joinedBooks={joinedbooks} onMoveToShelf={moveToShelf} onQueryChange={updateQuery} />}
        />
      </div>
    )
  }
}

export default App
