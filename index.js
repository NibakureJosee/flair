import pkg from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/Users.js";
import videoRoutes from "./routes/Video.js";
import commentRoutes from "./routes/Comments.js";
import cookieParser from "cookie-parser";

const app = pkg();

const connect = () => {
mongoose.set('strictQuery', false);
    mongoose.connect("mongodb://localhost:27017/myapp", ()=> {
        console.log("CONNECTED TO MONGO DB");
    })
}

//middlewares
app.use(cookieParser())
app.use(pkg.json());
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);

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

app.listen(8800, () => {
  connect();
  console.log("Connected to Server");
});

