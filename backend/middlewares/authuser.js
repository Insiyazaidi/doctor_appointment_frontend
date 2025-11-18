import jwt from "jsonwebtoken"
// authentication middleware
const authuser = async(req,res , next )=>{
try{
const {token} = req.headers
if(!token){
return    res.json({success:"false" , message:"not authorized login again "})
}
const token_decode = jwt.verify(token , process.env.JWT_SECRET)

req.userid = token_decode.id
next()
}
catch(error){
    console.log(error)
 return res.json({success:false , message:error.message})
}
}
export default authuser

