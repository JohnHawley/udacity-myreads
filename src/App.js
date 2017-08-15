import React from 'react'
import * as BooksAPI from './BooksAPI'
var ReactToastr = require("react-toastr") // This is an alert component package
import './App.css'

// React routing
import { Route, Link } from 'react-router-dom'

// Importing Components
import SearchBooks from './components/SearchBooks'
import Bookshelf from './components/Bookshelf'

// Toastr alert component
var { ToastContainer } = ReactToastr
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation)

class BooksApp extends React.Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })  // Because their the same namespace we could just use "{ contacts }" here
    })
  }

  //Update a books shelf
  updateShelf = (book, shelf) => {
    book.shelf = shelf

    this.setState(state => ({
      books: state.books.concat([book])
    }))

    //API request
    BooksAPI.update(book, shelf).then(
      console.log('Called updateShelf: ', book.title, shelf)
    )

    this.addAlert(book.title, shelf)
  }

  addAlert = (book, shelf) => {
    // Filter for readability
    switch (shelf) {
      case "read":
        shelf = 'Read';
        break;
      case "wantToRead":
        shelf = 'Want to read';
        break;
      case "currentlyReading":
        shelf = 'Currently Reading';
        break;
      case "none":
        shelf = 'None';
        break;
      default:
        break;
    }
    this.container.success(
      "Moved to " + shelf,
      book, {
        timeOut: 2000,
        extendedTimeOut: 10000
      });
  }

  render() {
    return (
      <div className="app">
        <ToastContainer ref={(input) => { this.container = input; }}
          toastMessageFactory={ToastMessageFactory}
          className="toast-bottom-left" />
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads Demo</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf books={this.state.books} shelf="currentlyReading" shelfTitle="Currently Reading" updateShelf={this.updateShelf} />
                <Bookshelf books={this.state.books} shelf="wantToRead" shelfTitle="Want to read" updateShelf={this.updateShelf} />
                <Bookshelf books={this.state.books} shelf="read" shelfTitle="Read" updateShelf={this.updateShelf} />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />

        <Route path="/search" render={() => (
          <SearchBooks books={this.state.books} updateShelf={this.updateShelf} />
        )} />

      </div>
    )
  }
}

export default BooksApp
