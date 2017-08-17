import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookList from './BookList'

class Bookshelf extends Component {

  componentWillReceiveProps(nextProps){
    console.log('componentWillReceiveProps nextProps: ',nextProps);


  }

  componentDidMount(data){
    console.log(`componentDidMount: ${data}`);
    console.log('bookshelf props:' ,this.props);
    this.props.resetJoinedBooks()
  }
  // shouldComponentUpdate(nextProps, nextState){
  //   console.log(' shouldComponentUpdate Props: ',this.props);
  //   console.log(' shouldComponentUpdate nextProps: ',nextProps);
  //   console.log('equal: ', this.props.onMoveToshelf === nextProps.onMoveToshelf);
  //   // console.log('shouldComponentUpdate nextState: ',nextState);
  //   return true
  // }

  render() {
    // console.log('props ', this.props)
    let [cr, wr, r] = this.props.books
    return (
      <div>
        <div className="list-books">
          <div className="list-books-title"> <h1>MyReads</h1> </div>
          <div className="list-books-content">
            <BookList title="Currently Reading" books={cr} onMoveToShelf={this.props.onMoveToShelf} />
            <BookList title="Want to Read" books={wr} onMoveToShelf={this.props.onMoveToShelf} />
            <BookList title="Read" books={r} onMoveToShelf={this.props.onMoveToShelf} />
          </div>
        </div>
        <div className="open-search">
          <Link className="close-search" to="/search"> Add a book</Link>
        </div>
      </div>
    )
  }
}

export default Bookshelf
