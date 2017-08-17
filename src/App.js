import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import BookShelf from './bookshelf/BookShelf'
import SearchBar from './bookshelf/SearchBar'
import * as BookApi from './utils/BooksAPI'
import './App.css'

class App extends Component {
  state = {
    query: '',
    books: [],
    joinedbooks:[]
  }

  componentDidMount() {
    this.getAllBooks()
  }

  getAllBooks = () => {
    BookApi.getAll()
      .then(data => {
        this.setState({ books: data })
      })
      .catch(error => console.log(error))
  }

  /**
   * filterBooksbyShelf - Filter the books in the state according to its shelf
   *
   * @param {array} [books=[]] Description
   *
   * @return {arrary} One shelf array per category (currentlyReading, wantToRead, read)
   */
  filterBooksbyShelf(books = []) {
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

  /**
    * createShelfs - Helper function for creating the shelfs according to the books state
    *
    * @return {array} filtered shelfs
    */
  createShelfs = () => this.filterBooksbyShelf(this.state.books)

  /**
   * moveToShelf - Moves a book between shelfs
   * @param {type} book The Book
   * @param {type} from from shelf
   * @param {type} to   to Shelf
   */
  moveToShelf = (book, to) => {
    BookApi.update(book, to)
      .then(data => {
        console.log('dataUPDate: ',data);
          this.getAllBooks()
      })
      // .then(() => this.getAllBooks())
      .catch(error => console.log('error ', error))
  }


  changeBooksIds =(books=[], qBooks=[])=>{
    for (let book of books) {
      for (let qBook of qBooks) {
        if(book.id === qBook.id){
          console.log('changed');
          qBook.shelf = book.shelf
          console.log(`changed ${qBook.title} with shelf : ${qBook.shelf}`);
        }
      }
    }
    return qBooks
  }

  /**
  * joinBooksQuery - Joins/concats the mainShelf with the books comming from the query
  *
  * @param {type}  mainShelf         Books in the mainShelf. All tree (currentlyReading, wantToRead, read)
  * @param {array} [queryresults=[]] Books comming from the API via query
  *
  * @return {array} Returns an array of the combination of books between the mainShelf and the queryresults
  */

  joinBooksQuery = (mainShelf=[], queryresults = []) => {
    debugger;
    (mainShelf.length>0 || queryresults.length>0)
    ? this.setState({joinedbooks: this.changeBooksIds(mainShelf,queryresults) })
    : this.setState({joinedbooks: [] })
  }

  /** executeQuery - Execute the query according to the input in the SearchBar
  *
  * @param {type} query String with the search query
  *
  * @return {type} sets the query-books state
  */
  executeQuery = query => {
    BookApi.search(query)
        .then(data => {
          console.log('this is the data query-books ',data);
          (data.error && data.items.length===0)
          ? this.resetJoinedBooks()
          : this.joinBooksQuery(this.state.books, data)
        })
        .catch(err => console.log(`Error : ${err}`))
  }

  /**
   * updateQuery - Helper function for the executeQuery function
   */
  updateQuery = query => {
    if(query && query !== ""){
      this.setState({ query: query.trim() })
      this.executeQuery(this.state.query)
    }
    this.setState({ query: '',joinedbooks:[] })//ojoooooooooooooooooooo
  }

  resetJoinedBooks = ()=>{
    this.setState({ joinedbooks: [] })

  }

  render() {
    const { query,joinedbooks  } = this.state
    return (
      <div className="App">
        <Route exact path="/search" render={history =>
            <SearchBar
              query={query}
              joinedBooks={joinedbooks}
              onMoveToShelf={this.moveToShelf}
              onQueryChange={this.updateQuery}
            />}
        />
        <Route exact path="/" render={history =>
            <BookShelf
              history={history}
              resetJoinedBooks={this.resetJoinedBooks}
              books={this.createShelfs()}
              onMoveToShelf={this.moveToShelf} />}
        />
      </div>
    )
  }
}

export default App
