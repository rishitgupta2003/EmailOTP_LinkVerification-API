import mongoose from "mongoose";
import { DB_Name } from "../constants.js";

export const connectDB = async() => {
    try{
        const connectionInstance = await mongoose.connect(
            `${process.env.DATABASE_URI}/${DB_Name}`
        );
        console.log(`Connection Established - DB HOST -> ${connectionInstance.connection.host}`);
    }catch(error){
        console.log(`Error -> ${error.message}`);
        process.exit(1);
    }
}