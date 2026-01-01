import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        const connectionRes = await mongoose.connect(process.env.MONGODB_URI) 
        console.log(`\n\nMONGODB successfully connected\nVISIT:${connectionRes.connection.host}`)
    } catch (error) {
        console.log("ERROR in MONGODB connection",error)
        process.exit(1)
    }
}