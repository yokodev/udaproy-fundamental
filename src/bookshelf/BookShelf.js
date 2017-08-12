import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookList from './BookList'

class Bookshelf extends Component {
  render() {
    // console.log('props ', this.props)
    let [cr, wr, r] = this.props.books
    return (
      <div>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <BookList title="Currently Reading" books={cr} onMoveToShelf={this.props.onMoveToShelf} />
            <BookList title="Want to Read" books={wr} onMoveToShelf={this.props.onMoveToShelf} />
            <BookList title="Read" books={r} onMoveToShelf={this.props.onMoveToShelf} />
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

export default Bookshelf
