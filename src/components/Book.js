/*
 * ======= INACTIVE COMPONENT ========
 * 
 * This component was an attempt at "componentizing" more in React.
 * 
 * I don't think it's necessary for this project so I scrapped it.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
    static propTypes = {
        book: PropTypes.object,
        onChangeStatus: PropTypes.func
    }
    state = {

    }

    render() {

        const { book, onChangeStatus } = this.props

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                        <select value={ book.shelf || ('none')}>
                            <option disabled>Move to...</option>
                            <option onClick={() => onChangeStatus(book, this.value)} value="currentlyReading">Currently Reading</option>
                            <option onClick={() => onChangeStatus(book, this.value)} value="wantToRead">Want to Read</option>
                            <option onClick={() => onChangeStatus(book, this.value)} value="read">Read</option>
                            <option onClick={() => onChangeStatus(book, this.value)} value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                {book.authors && (
                    <div className="book-authors">{book.authors.join(', ')}</div>
                )}
            </div>
        )
    }
}

export default Book