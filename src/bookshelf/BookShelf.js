import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookList from './BookList'

/**
 * Bookshelf - Bookshelf class Component this is where the other shelfs live
 * it renders BookList components for each shelf
 * @extends Component
 */
class Bookshelf extends Component {
  componentDidMount(data) {
    this.props.resetJoinedBooks()
  }

  render() {
    const { onMoveToShelf, books: [cr, wr, r] } = this.props
    return (
      <div>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <BookList title="Currently Reading" books={cr} onMoveToShelf={onMoveToShelf} />
            <BookList title="Want to Read" books={wr} onMoveToShelf={onMoveToShelf} />
            <BookList title="Read" books={r} onMoveToShelf={onMoveToShelf} />
          </div>
        </div>
        <div className="open-search">
          <Link className="close-search" to="/search">
            Add a book
          </Link>
        </div>
      </div>
    )
  }
}
Bookshelf.propTypes = {
  books: PropTypes.array.isRequired,
  onMoveToShelf: PropTypes.func.isRequired
}

export default Bookshelf
