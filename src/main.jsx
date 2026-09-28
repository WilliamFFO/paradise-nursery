import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import '@fontsource-variable/inter'
import '@fontsource-variable/fraunces'
import { store } from './store.js'
import App from './App.jsx'

// HashRouter (#/plantas, #/carrito…) funciona bajo el subdirectorio de
// GitHub Pages (/paradise-nursery/) y evita el 404 al recargar una subruta.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>,
)
