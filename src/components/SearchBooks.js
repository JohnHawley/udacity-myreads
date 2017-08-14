import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

// Import API
import * as BooksAPI from './../BooksAPI'

// Components
import ListBooks from './ListBooks.js';


class SearchBooks extends Component {
    static propTypes = {
        updateShelf: PropTypes.func.isRequired,
    }

    state = {
        query: '',
        maxResults: 20,
        books: []
    }

    // Issues with spaces and final query. triming trailing spaces disables spacebar input.
    // Issues with type speed, need to debounce the input and change state.
    updateQuery = (query) => {
        this.setState({ query: query })
    }

    componentWillUpdate(nextProps, nextState) {
        let trimmedQuery = nextState.query.replace(/^\s+/, '')
        trimmedQuery !== '' && (
            BooksAPI.search(trimmedQuery, nextState.maxResults).then((books) => {
                (nextState.books = books)
            })
        )
    }

    queryBooks = () => {
        
    }

    render() {
        // ES6 Variable declarations -- To refactor/cleanup code
        const { books } = this.state
        const { query } = this.state

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
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>

                <div className="search-books-results">
                    <ol className="books-grid">
                        {books.error || (
                            <ListBooks books={books} updateShelf={this.props.updateShelf} /> 
                        )}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks