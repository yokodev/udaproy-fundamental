import React from 'react'
import PropTypes from 'prop-types'


/**
 * Book - SFC(Stateless functional component ) to display the books (objects) comming from the API
 * @param {object} book               The object to display
 * @param {function} onMoveToShelf function to fire whenever a book needs to change to a different shelf
 */

const Book = ({book, onMoveToShelf}) => {
  let { title, authors, imageLinks: { thumbnail = 'nodata' } = 'nodata', shelf } = book
  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${thumbnail}")` }} />
        <div className="book-shelf-changer">
          <select
            defaultValue={shelf?shelf:"none"}
            onChange={event => onMoveToShelf(book, shelf, event.target.value)}>
            <option value="none" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title"> {title} </div>
      <div className="book-authors"> {authors} </div>
    </div>
  )
}
Book.propTypes = {
  book:PropTypes.object.isRequired,
  onMoveToShelf: PropTypes.func.isRequired
}
export default Book
