import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

// External packages
var _ = require('lodash')

// Import API
import * as BooksAPI from './../BooksAPI'

// Components
import ListBooks from './ListBooks.js';


class SearchBooks extends Component {
    static propTypes = {
        books: PropTypes.array,
        updateShelf: PropTypes.func.isRequired,
    }

    state = {
        maxResults: 20,
        booksQueried: []
    }

    // Issues with spaces and final query. triming trailing spaces disables spacebar input.
    // Issues with type speed, need to debounce the input and change state.
    updateQuery = (query) => {
        let trimmedQuery = query.replace(/^\s+/, '')

        trimmedQuery !== '' && (
            BooksAPI.search(trimmedQuery, this.state.maxResults).then((booksFromSearch) => {

                // Get Books in myShelf
                let myBooks = this.props.books.filter((book) => { return book.shelf !== 'none' })
               
                // Set defaults for shelf on searched books
                booksFromSearch.map((books) => { return books.shelf = 'none' })

                // Match book id
                myBooks = _.intersectionBy(myBooks, booksFromSearch, 'id')

                // Join the arrays together
                booksFromSearch = _.unionBy(myBooks, booksFromSearch, 'id')

                // Return array as setting the state
                this.setState({ booksQueried: booksFromSearch })
            })
        )
    }

    render() {
        // ES6 Variable declarations -- To refactor/cleanup code
        const { booksQueried } = this.state
        let query

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        {/* 
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                        
                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input
                            type='text'
                            placeholder='Search by title or author'
                            value={query}
                            onChange={ (event) => _.debounce(this.updateQuery(event.target.value), 200) }
                        />
                    </div>
                </div>

                <div className="search-books-results">
                    <ol className="books-grid">
                        {booksQueried.error || (
                            <ListBooks books={booksQueried} updateShelf={this.props.updateShelf} /> 
                        )}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks