import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import Admincontextprovider from './Context/Admincontext.jsx'
import Doctorcontextprovider from './Context/Doctorcontext.jsx'
import Appcontextprovider from './Context/Appcontext.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Admincontextprovider>
    <Doctorcontextprovider>
      <Appcontextprovider>
 <App />
      </Appcontextprovider>
    </Doctorcontextprovider>
  </Admincontextprovider>
   
  </BrowserRouter>,
)
