import mongoose from "mongoose";


const leadSchema = new mongoose.Schema({
    name:String,
    emailId:String,
    message:String,
    status:String
    
})
// delete mongoose.models.issues;
const Lead = mongoose.models.leads || mongoose.model("leads",leadSchema)

export default Lead;