import connectDB from "./connectMongoDB";
import { mongo_uri } from "./config";

connectDB(mongo_uri);