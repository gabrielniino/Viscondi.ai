import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { HomePage } from './components/pages/HomePage/HomePage'
import { AuthenticationPage } from './components/pages/AuthenticationPage/AuthenticationPage'
import { LoginPage } from './components/pages/LoginPage/LoginPage'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <AuthenticationPage /> */}
      {/* <LoginPage/> */}
      <HomePage />
    </BrowserRouter>
  </React.StrictMode>,
)