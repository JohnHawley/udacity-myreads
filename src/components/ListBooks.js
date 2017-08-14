import React, { Component } from 'react'
import PropTypes from 'prop-types'


class ListBooks extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        updateShelf: PropTypes.func.isRequired
    }

    handleChange(event, book) {
       this.props.updateShelf(book, event.target.value);
    }

    render() {
        // ES6 Variable declarations -- To refactor/cleanup code
        const { books } = this.props

        return (
            <ol className="books-grid">
                {books !== ([]) && (

                    books.map((book) => (
                        <li key={book.id}>
                            {/* This could be separated out into a 'Book' component, but the function updateShelf would be passed up quite a few levels, eh... let's do this for simplicity's sake. */}
                            <div className="book">
                                <div className="book-top">
                                    <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                    <div className="book-shelf-changer">
                                        <select defaultValue={book.shelf || ('none')} onChange={(event) => {this.handleChange(event, book)}}>
                                            <option disabled>Move to...</option>
                                            <option value="currentlyReading">Currently Reading</option>
                                            <option value="wantToRead">Want to Read</option>
                                            <option value="read">Read</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="book-title">{book.title}</div>
                                {book.authors && (
                                    <div className="book-authors">{book.authors.join(', ')}</div>
                                )}
                            </div>
                        </li>
                    ))

                )}
            </ol>
        )
    }
}


export default ListBooks