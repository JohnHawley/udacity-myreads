import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

// Import Browser Router from React Router
import { BrowserRouter } from 'react-router-dom'

// Wrap Browser Router around APP root
ReactDOM.render(
    <BrowserRouter><App /></BrowserRouter>,
    document.getElementById('root')
)
