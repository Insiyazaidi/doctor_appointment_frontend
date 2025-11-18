import { doctormodel } from "../models/doctorsmodel.js"

const changeavailability = async(req ,res)=>{
try{
const {docid} = req.body 
const docdata = await doctormodel.findById(docid)
await doctormodel.findByIdAndUpdate(docid , {available :!docdata.available})
res.json({success:true , message:"Availability changed "})
}
catch(error){
    console.log(error)
     res.json({success:false , message:error.message})
}
}


const doctorlist = async(req,res)=>{
try{
    const doctors= await doctormodel.find({}).select(["-password" , "-email"])
    res.json({success:true , doctors})

} catch(error){
   console.log(error)
     res.json({success:false , message:error.message}) 
}
}
export {changeavailability , doctorlist}