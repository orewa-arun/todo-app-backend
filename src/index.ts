import connectDB from "./connectMongoDB";
import { mongo_uri } from "./config";
import express,  {Express} from "express";
import todoRoutes from "./routes";

connectDB(mongo_uri);

const app : Express = express();

const PORT : string | number = process.env.PORT || 4000;

// allows processing req as json objects
app.use(express.json());
// takes all routes after "/api"
app.use("/api", todoRoutes);

app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);