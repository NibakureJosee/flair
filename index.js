const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const User = require("./models/user.model");
const Post=require('./models/post.model');
const jwt = require("jsonwebtoken");
const { json } = require("express");
const bcrypt = require("bcrypt");
const { OAuth2Client } = require('google-auth-library');
const admin = require('firebase-admin');
const { getBiography } = require("./controller/biography");
const userRouter  = require("./routes/userRoutes");
const postRouter  = require("./routes/postRoutes");
const videoRouter =require("./routes/videoRoutes");
const bioRouter = require("./routes/bioRoute");
const followersRouter =require("./routes/followersRoutes");
const dotenv=require('dotenv');
dotenv.config();

// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/firestore';
// import 'firebase/storage';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const connect = async() => {
   mongoose.set('strictQuery', false);    
    mongoose.connect(process.env.MONGO, ()=> {
         console.log("mongodb connected");     
        }) }

app.get("/home", (req, res) => {
  res.send("welcome on our home page");
});

app.use('/api/user',userRouter)
app.use('/api/post', postRouter)
app.use('/api/video', videoRouter)
app.use('/api/follower', followersRouter)
app.use('/api/bio', bioRouter)
connect();


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`the app is listening on ${PORT}`);
});


      

const mongoose = require ("mongoose");
const dotenv = require ("dotenv");
const cors = require ("cors");
const userRoutes = require ("./routes/Users.js");
const videoRoutes = require ("./routes/Video.js");
const commentRoutes = require ("./routes/Comments.js");
const cookieParser = require ("cookie-parser");
const messageRoutes = require ("./routes/messages.js");
const socket = require("socket.io");

dotenv.config();

//middlewares
app.use(cookieParser())
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/messages", messageRoutes);

//error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
connect();


const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});



