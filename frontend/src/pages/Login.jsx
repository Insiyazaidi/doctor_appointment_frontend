import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Context/Appcontext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
const Login = () => {
  const {backendurl , token , Settoken} = useContext(AppContext)
  const [state , Setstate] = useState("sign up")
  const [email , Setemail]= useState("")
    const [password , Setpassword]= useState("")
      const [name , Setname]= useState("")
      const navigate = useNavigate()
        const onsubmithandler = async(e)=>{
          e.preventDefault()
      try {
        if(state==="sign up"){
const {data} = await axios.post(backendurl+"/api/users/register" , {name , password,email})
//console.log(data)
if(data.success){
localStorage.setItem("token" , data.token)
Settoken(data.token)
}    else{
          toast.error(data.message)
}
          
      }


      else{
const {data} = await axios.post(backendurl+"/api/users/login" , { password,email})
console.log(data)
if(data.success){
localStorage.setItem("token" , data.token)
Settoken(data.token)
}    else{
          toast.error(data.message)
}
      }
    }
       catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }

     useEffect(()=>{
       if(token){
 navigate("/")
      }
     } , [token])

  return (
  
    <div>
<form onSubmit={onsubmithandler} className='min-h-[80vh] flex items-center'>
<div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
  <p className='text-2xl font-semibold' >{state==="sign up" ? "Create Account" :"Login"}</p>
  <p >Please {state==="sign up" ? "create Account" :"Login"} to book Appointment </p>
 
 {
  state==="sign up" &&   <div className='w-full'>
    <p>Full Name</p>
    <input   className='border -border-zinc-300 rounded w-full p-2 mt-1' type='text' onChange={(e)=> Setname (e.target.value)} required></input>
  </div>
 }
 

    <div className='w-full'>
    <p>Email</p>
    <input  className='border -border-zinc-300 rounded w-full p-2 mt-1' type='email' onChange={(e)=> Setemail (e.target.value)} required></input>
  </div>
   <div className='w-full'>
    <p>Password</p>
    <input  className='border -border-zinc-300 rounded w-full p-2 mt-1' type='password' onChange={(e)=> Setpassword(e.target.value)} required></input>
  </div>
 <button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base'>{state==="sign up" ? "Create Account" :"Login"}</button>
{
  state==="sign up" ? <p>Already have an account ? <span onClick={()=>Setstate("Login")} className='text-primary underline cursor-pointer'> Login here</span> </p>:<p>Create a new account ? <span className='text-primary underline cursor-pointer'onClick={()=>Setstate("sign up")}>click here</span>  </p>
}

</div>
</form>

    </div>
  )
}

export default Login