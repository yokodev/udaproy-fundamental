import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

/**
 * BookList - SFC this is the representation of a bookshelf or list of books with same shelf
 *
 * @param {string}   title         this is the title of the bookshelf
 * @param {object}   books         the actual book object coming from the API
 * @param {function}   onMoveToShelf function handler for moving the books to another shelf

 */
const BookList = ({ title, books, onMoveToShelf }) =>
  <div className="bookshelf">
    <h2 className="bookshelf-title">
      {title}
    </h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {books.map(book =>
          <li key={book.id}>
            <Book book={book} onMoveToShelf={onMoveToShelf} />
          </li>
        )}
      </ol>
    </div>
  </div>

BookList.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  onMoveToShelf: PropTypes.func.isRequired
}

export default BookList
