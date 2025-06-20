import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import AuthRoute from './Routes/AuthRoute.js';
import UserRoute from './Routes/UserRoute.js';
import PostRoute from './Routes/PostRoute.js';
import UploadRoute from './Routes/UploadRoute.js';


// import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Routes
const app = express();

app.use(express.json());

// to serve images for public (public folder)
// app.use(express.static('public'));
app.use('/images', express.static('public/images'));


// MiddleWare
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });
dotenv.config();

mongoose.connect("mongodb://localhost:27017/social-media-app")
.then(() => {
    console.log("Connected to MongoDB successfully");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch(err => console.error("MongoDB connection error:", err));

  // uses of routes

  app.use('/auth', AuthRoute);
  app.use('/user', UserRoute);
  app.use('/post', PostRoute);
  app.use('/upload', UploadRoute);


  // app.use(cors({
  //     origin: ["http://localhost:3000"],
  //     methods: ["GET", "POST", "PUT", "DELETE"],
  //     credentials: true
  // }));