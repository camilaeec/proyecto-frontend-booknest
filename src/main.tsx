import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import AppRouter from './router/AppRouter'
import { BrowserRouter } from 'react-router-dom'

const container = document.getElementById('root')
if (!container) throw new Error('No se encontró el elemento root')

createRoot(container).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
