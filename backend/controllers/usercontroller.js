import validator from "validator"
import bcrypt from "bcrypt"
import {usermodel} from "../models/usermodel.js"
import jwt from "jsonwebtoken"
import {v2 as cloudinary} from "cloudinary"
// api to register user 
const registeruser = async(req,res)=>{
try {
    const {name , email , password} = req.body 
   
    if(!name || !email || !password){
        return res.json({success:false  , message:"missing details"})
    }
    if(!validator.isEmail(email)){
         return res.json({success:false  , message:"enter a valid email"})
    }
    if(password.length<8){
         return res.json({success:false  , message:"enter a strong password"})
    }
    // hashing user password
    const salt = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(password , salt)

    const userdata = {name , email , password:hashedpassword}
    const newuser = new usermodel(userdata)
    const user = await newuser.save()
    const token = jwt.sign({id:user._id} , process.env.JWT_SECRET)
    res.json({success:true , token})
    // _id


} catch (error) {
     console.log(error) 
     return res.json({success:false , message:error.message})
}
}

const loginuser = async(req,res)=>{
    try {
       const {email , password} = req.body
       const user = await usermodel.findOne({email})
       if(!user){
        return res.json({success:false , message:"user does not exist "})
       }
       const ismatch = await bcrypt.compare(password, user.password)
       if(ismatch){
        const token = jwt.sign({id:user._id} , process.env.JWT_SECRET)
        res.json({success:true , token })
       }
       else {
         res.json({success:false ,message:"invalid credentials "  })
       }

    } catch (error) {
        console.log(error) 
     return res.json({success:false , message:error.message})
    }

}

// api to get user profile 
  const getprofile = async(req,res)=>{
      try {
       const userid = req.userid
    console.log(userid)
    const userdata = await usermodel.findById(userid).select("-password")
   return  res.json({success:true , userdata})
  } 

  catch (error) {
     console.log(error)
    return   res.json({success:false , message:error.message})
  }
  }
// //  // api to update user profile
  const updateprofile = async(req,res)=>{
      try {
 const userid = req.userid;
        let { name , phone , address , dob , gender}= req.body
          console.log(req.body.address , typeof address)
         const imagefile = req.file
          if( !name || !phone  || ! dob  || ! gender){
   return res.json({success:false , message:"data misssing "})
           }
if (typeof address === "string") {
  try {
    address = JSON.parse(address);
    if (typeof address === "string") {
      address = JSON.parse(address);
    }
  } catch (err) {
    console.log("❌ Address parse failed:", err);
    return res.json({ success: false, message: "Invalid address format" });
  }
}

          await usermodel.findByIdAndUpdate(userid , {name , phone , address , dob,gender})
          if(imagefile){
              const imageupload = await cloudinary.uploader.upload(imagefile.path , {resource_type:"image"})
              const imageurl = imageupload.secure_url
                            await usermodel.findByIdAndUpdate(userid , {image:imageurl})
           //   console.log(imageupload)
          }
       //   console.log(userid)
          res.json({success:true , message:"profile updated" , userid , name , phone , address , dob , gender})
      } 
      catch (error) {
           console.log(error)
   return   res.json({success:false , message:error.message})
     }
  }

    // ✅ Update basic info
   
  


export {registeruser , loginuser , getprofile , updateprofile} 