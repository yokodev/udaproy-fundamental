import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { debounce } from 'throttle-debounce'
import Book from './Book'
// import * as BookApi from '../utils/BooksAPI'
// import sortBy from 'sort-by';

/**
 * SearchBar - SearchBar Component for books comming from the API.
 *             its displayed in the /search Route.
 * @extends Component
 */
class SearchBar extends Component {
  constructor() {
    super()
    this.callQuery = debounce(500, this.callQuery)
  }

  makeChange(e) {
    this.callQuery(e.target.value)
  }
  /**
   * callQuery - Helper Function for the debouncer needed in the search input field
   * @param {type} value the Value of the query
   */
  callQuery(value) {
    this.props.onQueryChange(value)
  }
  /**
   * chooseBooks - Choose what array of books to show,
   *               having joinedBooks precedence over queryBooks
   * @param {type} queryBooks  queryBooks array
   * @param {type} joinedBooks joinedBooks array
   *
   * @return {type} Book array to show
   */
  componentDidMount(){
    // this.showBooks([],null);
  }
  // componentWillReceiveProps(nextProps){
  //   console.log('componentWillReceiveProps nextProps: ',nextProps);
  // }
  // shouldComponentUpdate(nextProps, nextState){
  //   console.log(' shouldComponentUpdate Props: ',this.props);
  //   console.log(' shouldComponentUpdate nextProps: ',nextProps);
  //   console.log('equal: ', this.props.onMoveToshelf === nextProps.onMoveToshelf);
  //   // console.log('shouldComponentUpdate nextState: ',nextState);
  //   return true
  // }


  /**
   * showBooks - Traverses the books given to the component in either @queryBooks or @joinedBooks
   * @param {array} [queryBooks=[]]  Books resulting from the making a query to the API
   * @param {array} [joinedBooks=[]] Shelf Books plus the queryBooks
   * @param {type}  onMoveToShelf    Move to Shelf handler
   */
  showBooks(joinedBooks = [], onMoveToShelf) {
    console.log('joinedBooks: ',joinedBooks);
    console.log('QUERY...',this.props.query);
    console.log('ENTRO....');
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
            {/* {(query ==="")? this.showBooks([], onMoveToShelf): this.showBooks(joinedBooks, onMoveToShelf)} */}
            {this.showBooks(joinedBooks, onMoveToShelf)}
          </ol>
        </div>
      </div>
    )
  }
}

SearchBar.propTypes = {
  query: PropTypes.string.isRequired,
  joinedBooks: PropTypes.array,
  onMoveToShelf: PropTypes.func.isRequired,
  onQueryChange: PropTypes.func.isRequired
}
export default SearchBar
