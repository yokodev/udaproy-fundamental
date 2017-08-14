import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

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
