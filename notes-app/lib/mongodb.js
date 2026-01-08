import mongoose from "mongoose";

const MONGODB_URI=process.env.MONGODB_URI
if(!MONGODB_URI){
    throw new Error("MONGODB_URI environment variable not correct")
}

async function dbConnect() {
    if(mongoose.connections[0].readyState) return;
    try {
        await mongoose.connect(MONGODB_URI)
        console.log("connected to mongodb");
    } catch (error) {
        console.error(error);
        throw new Error("database connection failed")
    }
}

export default dbConnect;