import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import WSProvider from './modules/ws/ws';
import NotisProvider from './modules/notifications/noti';

ReactDOM.render(
  <React.StrictMode>
    <NotisProvider>
      <WSProvider>
        <App />
      </WSProvider>
    </NotisProvider>
  </React.StrictMode>,
  document.getElementById('root')
)