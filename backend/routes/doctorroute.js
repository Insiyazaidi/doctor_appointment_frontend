import express from "express"
import { doctorlist } from "../controllers/doctorcontroller.js"
const doctorrouter = express.Router()
doctorrouter.get("/list" , doctorlist)

export default doctorrouter