const express = require ("express");
const mongoose = require ("mongoose");
const dotenv = require ("dotenv");
const cors = require ("cors");
const userRoutes = require ("./routes/Users.js");
const videoRoutes = require ("./routes/Video.js");
const commentRoutes = require ("./routes/Comments.js");
const cookieParser = require ("cookie-parser");
const messageRoutes = require ("./routes/messages.js");
const socket = require("socket.io");

const app = express();
dotenv.config();


const connect = () => {
mongoose.set('strictQuery', false);
    mongoose.connect(process.env.MONGO, ()=> {
        console.log("mongodb connected");
    })
}

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


