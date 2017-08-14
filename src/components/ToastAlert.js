import React, { Component } from 'react'

var ReactToastr = require("react-toastr")
var { ToastContainer } = ReactToastr // This is a React Element.

// For Non ES6...
// var ToastContainer = ReactToastr.ToastContainer;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation)


// In a react component:
class ToastAlert extends Component {

    addAlert = () => {
        this.container.success(
            "Moved to shelf: ",
            "", {
                timeOut: 2000,
                extendedTimeOut: 10000
            });
    }

    render() {
        return (
            <div>
                <ToastContainer ref={(input) => { this.container = input; }}
                    toastMessageFactory={ToastMessageFactory}
                    className="toast-bottom-left" />
                <button onClick={this.addAlert}>GGininder</button>
            </div>
        )
    }
}

export default ToastAlert