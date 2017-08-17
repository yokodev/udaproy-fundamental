import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { debounce } from 'throttle-debounce'
import Book from './Book'

/**
 * SearchBar - SearchBar Component for books comming from the API.
 *             its displayed in the /search Route.
 * @extends Component
 */
class SearchBar extends Component {
  constructor() {
    super()
    this.callQuery = debounce(300, this.callQuery)
  }

  makeChange(e) {
    this.callQuery(e.target.value)
  }
  /**
   * callQuery - Helper Function for the debouncer needed in the search input field
   * @param {string} value the Value of the query
   */
  callQuery(value) {
    this.props.onQueryChange(value)
  }

  /**
   * showBooks - Renders the books comming from the query and the shelf thus hence joinedBooks
   * @param {array} [joinedBooks=[]] Shelf Books plus the queryBooks
   * @param {function}  onMoveToShelf    Move to Shelf handler
   */
  showBooks(joinedBooks = [], onMoveToShelf) {
    return joinedBooks.length > 0
      ? joinedBooks.map((book, i) =>
          <li key={i}>
            <Book book={book} onMoveToShelf={onMoveToShelf} />
          </li>
        )
      : <h3> No books found..., Please try again with a different query</h3>
  }

  render() {
    const {  joinedBooks, onMoveToShelf } = this.props
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onKeyUp={this.makeChange.bind(this)} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.showBooks(joinedBooks, onMoveToShelf)}
          </ol>
        </div>
      </div>
    )
  }
}

SearchBar.propTypes = {
  joinedBooks: PropTypes.array,
  onMoveToShelf: PropTypes.func.isRequired,
  onQueryChange: PropTypes.func.isRequired
}
export default SearchBar
