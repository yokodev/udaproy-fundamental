import React from 'react'

const Book = props => {
  let {title, authors,imageLinks:{ thumbnail='nodata'}='nodata', shelf } = props.book
  // console.log('book props',props);
  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage:
              `url("${thumbnail}")`
          }}
        />
        <div className="book-shelf-changer">
          <select onChange={(event)=>props.onMoveToShelf(props.book,shelf,event.target.value)}>
            <option defaultValue value="none" >
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors}</div>
    </div>
  )
}
export default Book
