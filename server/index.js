import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from 'path';
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { createPost } from "./controllers/posts.js";
import { register } from "./controllers.auth.js";
import User from "./models/User.js";
import post from "./models/post.js";
import { user , posts } from "./data/index.js";
import { verifyToken } from "./middleware/auth.js";
import users from "./controllers/users.js";

// CONFIGRATIOAN

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));
app.use(morgon("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb",extended:true}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname,'public/assets')));

// FILE STORAGE
/**
 these information is coming from package instruction 
 from the github repo of multer
 By this we can save the file if anyone upload file on app ,
 then it is save in th "public/assets" folderr
 */
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null,"public/assets");
    },
    filename: function ( req,file,cb){
        cb(null,file.originalname);
    }
});
const upload = multer({ storage}); //this help us to save

//ROUTES WITH FILES
app.post("/auth/register",upload.single("picture"), register);
app.post("/posts", verifyToken,upload.single("picture"), createPost )//this is for save the post when post is uploaded

//ROUTES
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);// for the all the post

//MONGOOSE SETUP
const PORT = process.env.PORT || 6001;
mongoose
 .connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
 })
 .then(() =>{
    app.listen(PORT,()=> console.log('server Port: ${PORT}'));

    //ADD DATA ONE TIME
    // User.insertMany(users);
    // post.insertMany(posts);
 })
 .catch((error) => console.log('${error} did not connect'));