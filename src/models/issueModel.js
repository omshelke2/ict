import mongoose from "mongoose";


const issueSchema = new mongoose.Schema({
    issue:String,
    status:String,
    username:String
})
delete mongoose.models.issues;
const Issue = mongoose.models.issues || mongoose.model("issues",issueSchema)

export default Issue;