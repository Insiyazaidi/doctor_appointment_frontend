
import React, { useContext } from 'react'
 import { ToastContainer, toast } from 'react-toastify';
import Login from './Pages/Login'
import { Route } from 'react-router';
import { Routes } from 'react-router';
import { Appcontext } from './Context/Appcontext';
import { Admincontext } from './Context/Admincontext';
import Navbar from './components/navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './Pages/Admin/Dashboard';
import Allappointments from './Pages/Admin/Allappointments';
import Adddoctor from './Pages/Admin/adddoctor';
import Doctorslist from './Pages/Admin/Doctorslist';
const App = () => {
    const {atoken} = useContext(Admincontext)
  return atoken ? (
   <div className='bg-[#F8F9FD]'>
    <ToastContainer/>
<Navbar/>
<div className=' flex items-start'>
  <Sidebar/>
  <Routes>
    <Route path="/" element={<></>}></Route>
    <Route path="/admin-dashboard" element={<Dashboard/>}></Route>
     <Route path="/all-appointments" element={<Allappointments/>}></Route>
      <Route path="/add-doctor" element={<Adddoctor/>}></Route>
       <Route path="/doctor-list" element={<Doctorslist/>}></Route>
  </Routes>
</div>
   </div>
  ) :(
    <>
  <Login/>
    <ToastContainer/>
    </>
  )
}

export default App