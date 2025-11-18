
import { useContext, useState } from "react"
import { assets } from "../../assets/assets"
import { Admincontext } from "../../Context/Admincontext"
import { toast } from "react-toastify"
import axios from "axios"
const Adddoctor = ()=>{

const [docimg , Setdocimg] = useState(false)
const  [name  , Setname] = useState("")
const  [email  , Setemail] = useState("")
const  [password , Setpassword] = useState("")
const  [experience  , Setexperience] = useState("1 Year")
const  [fees  , Setfees] = useState("")
const  [about  , Setabout] = useState("")
const  [speciality , Setspeciality] = useState("General Physician")
const  [degree  , Setdegree] = useState("")
const  [address1  , Setaddress1] = useState("")
const  [address2  , Setaddress2] = useState("")
const {atoken , backendurl} = useContext(Admincontext)

const onsubmithandler=async(e)=>{
e.preventDefault();
try{
if(!docimg){
    return toast.error("Image not selected")
}
const formdata = new FormData()
  formdata.append("image" , docimg)
  formdata.append("name" , name)
  formdata.append("email" , email)
  formdata.append("password" , password)
  formdata.append("experience" , experience)
  formdata.append("fees" , Number(fees))
  formdata.append("about" , about)
  formdata.append("speciality" , speciality)
  formdata.append("degree" , degree)
  formdata.append("address" , JSON.stringify({line1 : address1 , line2:address2}))

  formdata.forEach((value , key)=>{
    console.log(`${key} :${value}`)
  })
const {data} = await axios.post(backendurl+"/api/admin/add-doctor" , formdata, {headers:{atoken}})
if(data.success){
    toast.success(data.message)
    Setdocimg(false)
    Setname("")
       Setemail("")
          Setpassword("")
        Setfees("")
             Setaddress1("")
          Setaddress2("")
          Setdegree("")
            Setabout("")

}  
else{
    toast.error(data.message)
}
}
catch(error){
 toast.error(error.message)
 console.log(error)
}
}
return(
    <form  onSubmit={onsubmithandler} className="m-5 w-full " >
        <p className="mb-3 text-lg font-medium" >Add Doctor</p>
        <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
            <div className="flex items-center gap-4 mb-8 text-gray-500 " >
                <label htmlFor="doc-img">
                    <img className="w-16 bg-gray-100 rounded-full cursor-pointer" src={ docimg ? URL.createObjectURL(docimg) :  assets.upload_area}></img>
                </label>
                <input onChange={(e)=>Setdocimg(e.target.files[0])} type="file" id="doc-img" hidden ></input>
                <p>Upload doctor <br/>picture</p>
            </div>
            <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">

                <div className="w-full lg:flex-1 flex flex-col gap-4 " >
                    <div className=" flex-1  flex  flex-col gap-1" >
                        <p>Doctor name</p>
                        <input onChange={(e)=>Setname(e.target.value)}  value={name} type="text" className="border rounded px-3 py-2 " placeholder="Name" required></input>
                    </div>
                       <div  className=" flex-1  flex  flex-col gap-1" >
                        <p>Doctor Email</p>
                        <input  onChange={(e)=>Setemail(e.target.value)}  value={email} className="border rounded px-3 py-2 " type="email" placeholder="Email" required></input>
                    </div>
                     <div  className=" flex-1  flex  flex-col gap-1" >
                        <p>Doctor Password</p>
                        <input onChange={(e)=>Setpassword(e.target.value)}  value={password} className="border rounded px-3 py-2 " type="password" placeholder="Password" required></input>
                    </div>

                     <div  className=" flex-1  flex  flex-col gap-1" >
                        <p>Experience</p>
                       <select onChange={(e)=>Setexperience(e.target.value)}  value={experience} name="" id="">
  <option value="1 Year">1 Year</option>
         <option value="2 Year">2 Year</option>
     <option value="3 Year">3 Year</option>
         <option value="4 Year">4 Year</option>
             <option value="5 Year">5 Year</option>
          <option value="6 Year">6 Year</option>
          <option value="7 Year">7 Year</option>
             <option value="8 Year">8 Year</option>
                  <option value="9 Year">9 Year</option>
           <option value="10 Year">10 Year</option>
                       </select>
                    </div>        

<div>
      <p>Fees</p>
       <input onChange={(e)=>Setfees(e.target.value)}  value={fees} className="border rounded px-3 py-2 " type="number" placeholder="fees" required></input>
        </div>

    </div>

<div className="w-full lg:flex-1 flex flex-col gap-4 " >
    <div  className=" flex-1  flex  flex-col gap-1" >
        <p>Speciality</p>
        <select onChange={(e)=>Setspeciality(e.target.value)}  value={speciality}  className="border rounded px-3 py-2 " name="" >
            <option value="General physician" >General physician</option>
            <option value="Gynecologist" >Gynecologist</option>
            <option value="Dermatologist" >Dermatologist</option>
            <option value="Pediatricians" >Pediatricians</option>
              <option value="Neurologist" >Neurologist</option>
            <option value="Gastroenterologist" >Gastroenterologist</option>
        </select>
    </div>
    
         <div>
        <p>Education</p>
     <input onChange={(e)=>Setdegree(e.target.value)}  value={degree} className="border rounded px-3 py-2 " type="text" placeholder="Education" required></input>
                    </div>

                    
         <div>
          <p>Address</p>
        <input onChange={(e)=>Setaddress1(e.target.value)}  value={address1} className="border rounded px-3 py-2 " type="text" placeholder=" Address 1" required></input>
            <input onChange={(e)=>Setaddress2(e.target.value)}  value={address2} className="border rounded px-3 py-2 " type="text" placeholder="  Address 2" required></input>
                    </div>


</div>
  </div>

   <div>
        <p  className="mt-4 mb-2 "  >About Doctor</p>
     <textarea onChange={(e)=>Setabout(e.target.value)}  value={about}  className="w-full px-4 pt-2 border rounded "   placeholder="Write about doctor"  rows={5} required></textarea>
                    </div>
                    <button type="submit" className="bg-primary px-10 py-3 mt-4 text-white rounded-full ">Add Doctor</button>

        </div>
    </form>
)
}
export default Adddoctor