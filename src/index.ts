import connectDB from "./connectMongoDB";
import { mongo_uri } from "./config";
import express,  {Express} from "express";
import todoRoutes from "./routes";
import cors from 'cors';

const corsOptions = {
    origin: 'http://localhost:5173',  
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    optionsSuccessStatus: 200
}

connectDB(mongo_uri);

const app : Express = express();

const PORT : string | number = process.env.PORT || 4000;

// Allows cors origin from local server using cors middleware
// Has to be allowed before exporess.json() middleware
// because obtaining access precedes receiving req objects
app.use(cors(corsOptions));

// allows processing req as json objects
app.use(express.json());

// takes all routes after "/api"
app.use("/api", todoRoutes);


app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);