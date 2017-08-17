import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Components
import ListBooks from './ListBooks'

/*
*   Will take an array of book objs or ids and display them on a conditional category
*   Either CURRENTLY READING, WANT TO READ, READ,  (also there is a "NONE" state)
*/

class Bookshelf extends Component {

    // Not required to send anything to book shelf, empty shelfs, no problem.
    static propTypes = {
        books: PropTypes.array,
        shelf: PropTypes.string,
        shelfTitle: PropTypes.string,
        updateShelf: PropTypes.func
    }

    // Filter the array to show books on this shelf
    shelfFilter = (books) => (books.filter((book) => book.shelf === this.props.shelf))

    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
                <div className="bookshelf-books">
                    <ListBooks books={this.shelfFilter(this.props.books)} updateShelf={this.props.updateShelf} />
                </div>
            </div>
        )
    }
}

export default Bookshelf