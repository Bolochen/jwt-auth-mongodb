import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";

dotenv.config();
const app = express();
mongoose.connect('mongodb://localhost:27017/jwtauth_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', ()=> console.log('Database Connected'));

app.use(cors({ credentials:true, origin:'http://localhost:3000' }))
app.use(cookieParser());
app.use(express.json());
app.use(userRoute);

app.listen(5000, ()=> console.log('Server up and running'));