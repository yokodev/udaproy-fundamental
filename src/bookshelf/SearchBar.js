import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { debounce } from 'throttle-debounce'
import Book from './Book'
// import * as BookApi from '../utils/BooksAPI'

class SearchBar extends Component {
  constructor() {
    super();
    this.callQuery = debounce(500, this.callQuery);
  }
  
  makeChange(e) {
    this.callQuery(e.target.value);
  }
  
  callQuery(value) {
    console.log('value :: ', value);
    this.props.onQueryChange(value)
  }

  showBooks(books=[],onMoveToShelf) {
    console.log('books ',books);
    return books.length > 0
      ? books.map((book, i) =>
          <li key={i}>
            <Book onMoveToShelf={onMoveToShelf} book={book} />
          </li>
        )
      : <h2> NO BOOKS FOUND</h2>
  }
  render() {
    let { books, queryBooks, onMoveToShelf } = this.props
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/* <input 
              type="text"
              placeholder="Search by title or author"
              value={this.props.query}
              onChange={event => this.props.onQueryChange(event.target.value)}
            /> */}
            <input 
              type="text" 
              placeholder="Search by title or author"
              onKeyUp={this.makeChange.bind(this)}/>
          </div>
        </div>
        <div className="search-books-results">
          {/* {JSON.stringify(this.props.query)} */}
          <ol className="books-grid">
            {/* {this.showBooks(books)} */}
            {this.showBooks(queryBooks,onMoveToShelf)}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBar
