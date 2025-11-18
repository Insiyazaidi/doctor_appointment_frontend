import validator from  "validator"
import bcrypt from "bcrypt"
import {v2 as cloudinary} from "cloudinary"
import {doctormodel} from "../models/doctorsmodel.js"
import jwt from "jsonwebtoken"
// API for adding doctor
const adddoctor = async ( req, res)=>{
try{
const {name , email , password , speciality , degree , experience , about , fees , address} = req.body

const imagefile = req.file
console.log(  {name , email , password , speciality , degree , experience , about , fees , address},  imagefile)

 if(!name || !email ||  !password  ||   !speciality ||  !degree ||  !experience ||   !about ||  !fees ||  !address ){
 return res.json({success:false , message:"missing details"})
 }
// //if(!validator.isEmail(email)){
//   // return res.json({success:"false" , message:"Please enter a valid email "})  
// //}
 if(password.length<8){
   return res.json({success:false , message:"Please enter a strong password "})  
 }

 const salt = await bcrypt.genSalt(10)
 const hashpassword = await bcrypt.hash(password , salt)

 const imageupload = await cloudinary.uploader.upload(imagefile.path , {resources_type:"image"})
 const imageurl = imageupload.secure_url 
const doctordata = {
     name , email , image:imageurl , password:hashpassword , speciality , degree , experience , about , fees , address:JSON.parse(address) , date: Date.now()
 }
 const newdoctor = new doctormodel(doctordata)
  await newdoctor.save()
 res.json({success:true , message:"doctor added"})

}


catch(error){
console.log(error)
res.json({success:false , message:error.message})
}
}

// API for admin login
const loginadmin = async(req,res)=>{
try{
const {email , password} = req.body
if(email===process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
let token = jwt.sign(email+password , process.env.JWT_SECRET)
res.json({success:true , token})
}
else{
  res.json({success:false , message:"invalid credentials"})
}
}
catch(error){
console.log(error)
res.json({success:false , message:error.message})
}
}


// api to get all doctors list  for admin panel
const alldoctors = async (req,res)=>{
  try{
    const doctors = await doctormodel.find({}).select('-password')
    res.json({success:true , doctors})
  }
  catch(error){
     res.json({success:false , message:error.message})
  }
}

export  {adddoctor , loginadmin , alldoctors}