import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import WSProvider from './modules/ws/ws';
import NotisProvider from './modules/notifications/noti';
import SkinProvider from './modules/skins/skinStore';

ReactDOM.render(
  <React.StrictMode>
    <NotisProvider>
      <WSProvider>
        <SkinProvider>
          <App />
        </SkinProvider>
      </WSProvider>
    </NotisProvider>
  </React.StrictMode>,
  document.getElementById('root')
)