import mongoose from "mongoose";

mongoose.set('strictQuery', false);

export default async () => {
    try {
        const {connection} = await mongoose.connect(process.env.MONGO_URI);

        if(connection){
        console.log(`Connection to MongoDB : ${connection.host}`)
        }
    } catch (e) {
        console.log(err);
        process.exit(1);
    }
}