import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
class SearchBar extends Component {

  showBooks(books){
    // console.log('books ',books);
    return books.length>0 ? this.props.books.map((book)=><li key={book.id}><Book book={book}/ ></li>)
    :<h2> NO DATA</h2>
  }

  render() {
    let {books}= this.props
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"
              value={this.props.query}
              onChange={(event)=> this.props.onQueryChange(event.target.value)}
             />
          </div>
        </div>
        <div className="search-books-results">
          {JSON.stringify(this.props.query)}
          <ol  className="books-grid">
            {this.showBooks(books)}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBar
