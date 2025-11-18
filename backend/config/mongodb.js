import mongoose from "mongoose";

const connectdb = async()=>{
 await mongoose.connect(process.env.MONGO_URL)
 console.log("db connected")
}
export default connectdb