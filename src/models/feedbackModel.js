import mongoose from "mongoose";


const feedbackSchema = new mongoose.Schema({
    feedback:String,
    feedbackType:String,
    
})
// delete mongoose.models.issues;
const Feedback = mongoose.models.feedbacks || mongoose.model("feedbacks",feedbackSchema)

export default Feedback;