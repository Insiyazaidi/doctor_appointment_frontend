import express from "express"
import  {adddoctor , alldoctors, loginadmin}  from "../controllers/admincontroller.js"
import  upload  from "../middlewares/multer.js"
import authadmin from "../middlewares/authadmin.js"
import { changeavailability } from "../controllers/doctorcontroller.js"

const adminrouter = express.Router()
adminrouter.post("/add-doctor",authadmin, upload.single('image') , adddoctor)
adminrouter.post("/login" , loginadmin)
adminrouter.post("/all-doctors" , authadmin,alldoctors)
adminrouter.post("/change-availability" , authadmin,changeavailability)
export default adminrouter 