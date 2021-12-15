import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import WSProvider from './modules/ws/ws';

ReactDOM.render(
  <React.StrictMode>
    <WSProvider>
      <App />
    </WSProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
