import { createContext, useState } from "react";
import {toast} from "react-toastify"
import axios from "axios"


export const Admincontext = createContext();


const Admincontextprovider = (props)=>{

    const[atoken , Setatoken] = useState(localStorage.getItem("atoken")? localStorage.getItem("atoken") : "")
    const [ doctors , Setdoctors] = useState([])
    const backendurl = import.meta.env.VITE_BACKEND_URL
   const getalldoctors =async ()=>{
try{
const {data} =  await axios.post(backendurl+"/api/admin/all-doctors" , {} , {headers:{atoken}})
console.log(data)
if(data.success){
    Setdoctors(data.doctors)
    console.log(data.doctors)
}
else{
toast.error(error.message)
}
}
 catch(error){
console.log(error)
}
   }

const changeavailability = async(docid)=>{
    try{
 const {data} = await axios.post(backendurl+"/api/admin/change-availability" , {docid} , {headers:{atoken}})
 if(data.success){
    toast.success(data.message)
    getalldoctors()
 }
 else{
    toast.error(data.message)
 }
    }
     catch(error){

toast.error(error.message)
}
}


    const value = {atoken , Setatoken , backendurl , doctors , getalldoctors , changeavailability}
    return(

        <Admincontext.Provider value={value}>
{props.children}
        </Admincontext.Provider>
    )
}
export default Admincontextprovider