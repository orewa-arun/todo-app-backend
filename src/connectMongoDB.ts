import mongoose, { mongo } from "mongoose";

const connectDB = async (uri : string) => {
    try {
        await mongoose.connect(uri);
        console.log("mongodb connection successful!");
    } catch (error) {
        console.log("mongodb connection ERROR : ", error);
        process.exit(1);
    }
}

// Handling connection events
mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to DB");
});

mongoose.connection.on("error", (error) => {
    console.error("Mongoose connection Error : ", error);
});

mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected from DB");
});

process.on("SIGINT", async () => {
    await mongoose.connection.close();
    console.log("mongoose connection closed due to app termination");
    process.exit(0);
})

export default connectDB;