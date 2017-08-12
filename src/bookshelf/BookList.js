import React, { Component } from 'react'
import Book from './Book'

class BookList extends Component {
  render() {
    // console.log('PROPS: ',this.props);
    let { title, books=[] } =this.props;
    // console.log(`books for ${title} `, this.props.books);
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              books.map((book)=>
                (<li key={book.id}>
                  <Book book={book} onMoveToShelf={this.props.onMoveToShelf}/>
                </li>)
              )
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default BookList
