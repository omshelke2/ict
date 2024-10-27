import mongoose from "mongoose"


export async function connect(){
    try {
       mongoose.connect(process.env.MONGO_URL!);
        
       
       const connection = mongoose.connection;
       connection.on("connect", ()=>{
        console.log("Connected to MongoDB");
       });

       connection.on("error", (error)=>{
        console.error("Error connecting to MongoeDB : " + error);
       })

    } catch (error) {
        console.log("Something went wrong in connecting to DB");
        console.log(error)
        
    }
}