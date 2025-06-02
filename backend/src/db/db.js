import mongoose from "mongoose"


const connectdb = async() => {
    try{
        const connectioninstance =  await mongoose.connect(`${process.env.MONGODB_URL}/mini-stackoverflow`)
        console.log("database connected");

    }
    catch(error)
    {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

export default connectdb ;