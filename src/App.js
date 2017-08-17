import React, { Component } from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'
import _ from 'lodash'

// React routing
import { Route, Link } from 'react-router-dom'

// Importing Components
import SearchBooks from './components/SearchBooks'
import Bookshelf from './components/Bookshelf'

// Toastr alert component via 'import' just ain't working quite right
const ReactToastr = require('react-toastr')
const { ToastContainer } = ReactToastr
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation)

class BooksApp extends Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })  // Because theyre the same namespace we could just use "{ books }" here
    })
  }

  //Update a books shelf
  updateShelf = (book, shelf) => {
    // Set new shelf
    book.shelf = shelf


    // Check if book is already stored in state
    if (!_.some(this.state.books, ['id', book.id]))
      this.setState(state => ({ books: this.state.books.concat(book) }))
    else
      this.setState(state => {
        state.books[_.findIndex(state.books, ['id', book.id])].shelf = shelf
        return { books: state.books };
      })

    // Nice way to check if the book is present! You can do this too with the find() function:
    // 
    // if (!!this.state.books.find(b => b.id === book.id)) {
    // ...
    // }
    // The find() will return undefined if the element was not found, so you can use the not not operator to double check if the element exists or no.

    //API request
    BooksAPI.update(book, shelf).then(
      console.log('Called updateShelf: ', book.title, shelf)
    )

    // Make toast alert
    this.addAlert(book.title, shelf)
  }

  addAlert = (book, shelf) => {
    // Filter for readability for alert message
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
    // Call alert message
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
