import React, { useContext } from 'react'
import { Admincontext } from '../Context/Admincontext'
import { NavLink } from 'react-router'
import { assets } from '../assets/assets'

const Sidebar = () => {
    const {atoken } = useContext(Admincontext)

  return (
    <div className='min-h-screen bg-white border-r'>
        {
            atoken  && <ul className='text-[#515151] mt-5'>
                <NavLink className={({isActive})=>`flex items-centre gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-primary border-r-4   " :" "}`} to="/admin-dashboard">
                    <img src={assets.home_icon}></img>
                    <p>Dadhboard</p>
                </NavLink>
                   <NavLink  className={({isActive})=>`flex items-centre gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-primary border-r-4   " :" "}`} to ="/all-appointments">
                    <img src={assets.appointment_icon}></img>
                    <p>Appointments</p>
                </NavLink>
                   <NavLink className={({isActive})=>`flex items-centre gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-primary border-r-4   " :" "}`} to ="/add-doctor" >
                    <img src={assets.add_icon}></img>
                    <p> Add Doctor</p>
                </NavLink>
                   <NavLink className={({isActive})=>`flex items-centre gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-primary border-r-4   " :" "}`} to ="/doctor-list" >
                    <img src={assets.people_icon}></img>
                    <p>Doctors List</p>
                </NavLink>
            </ul>
        }
    </div>
  )
}

export default Sidebar