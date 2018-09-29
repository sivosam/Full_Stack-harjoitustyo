import ReactDOM from 'react-dom'
import React from 'react'
import App from './App'
import axios from 'axios'

axios.get('http://localhost:3001/notes').then(response => {
    ReactDOM.render(
        <App />,
        document.getElementById('root')
      )
})