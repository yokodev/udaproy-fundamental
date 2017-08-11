import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookList from './BookList'

import * as BookApi from '../utils/BooksAPI'

class Bookshelf extends Component {
  state = {
    books:[],
    shelf: [],
    currentlyReading: [],
    wantToRead: [],
    read: []
  }
  componentDidMount() {
    this.getAllBooks();
  }
  
  getAllBooks(){
    BookApi.getAll()
    .then(data => this.modifyState(data))
    .catch(error => console.log(error))
  }

  filterBooksFromState(books) {
    console.log('FILTER ', books)
    let cr = [],
      wr = [],
      r = []
    for (let book of books) {
      book.shelf === 'currentlyReading' && cr.push(book)
      book.shelf === 'wantToRead' && wr.push(book)
      book.shelf === 'read' && r.push(book)
    }
    return [cr, wr, r]
  }

  modifyState(state) {
    let [cr, wr, r] = this.filterBooksFromState(state)
    this.setState({
      shelf: state,
      currentlyReading: [...cr],
      wantToRead: [...wr],
      read: [...r]
    })
  }
  moveFromShelf = (book, from, to) => {
    let { history } = this.props.history
    // console.log('book ', book)
    // console.log('from ', from)
    // console.log('to ', to)
    BookApi.update(book, to)
      .then(data => {
        console.log('data de update ', data)
        // this.modifyState(data);
        // history.push('/');
        console.log(this.state.shelf)
        this.modifyState(this.state.shelf)
      })
      .catch(error => console.log('error ', error))
  }

  render() {
    console.log('stado ', this.state)
    console.log('props ', this.props)
    let { currentlyReading = [], wantToRead = [], read = [] } = this.state
    // console.log('currentlyReading state ',currentlyReading);
    // console.log('wantToRead state ',wantToRead);
    return (
      <div>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <BookList title="Currently Reading" books={currentlyReading} onMoveToShelf={this.moveFromShelf} />
            <BookList title="Want to Read" books={wantToRead} onMoveToShelf={this.moveFromShelf} />
            <BookList title="Read" books={read} onMoveToShelf={this.moveFromShelf} />
          </div>
        </div>
        <div className="open-search">
          <Link className="close-search" to="/search">
            {' '}Add a book
          </Link>
        </div>
      </div>
    )
  }
}

export default Bookshelf
