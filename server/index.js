const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Message = require("./models/Message");

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// MongoDB Connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully 🚀");
  })
  .catch((err) => {
    console.log(err);
  });

// Socket Connection
io.on("connection", (socket) => {
  console.log("User Connected 🔥");

  // Message Receive
  socket.on("send_message", async (data) => {
    console.log(data);

    try {
      // MongoDB Save
      const newMessage = new Message({
        username: data.username || "Anonymous",
        message: data.message,
        room: data.room || "global",
      });
console.log(newMessage);
      await newMessage.save();
      console.log("Saved In MongoDB 🔥");

      // Send To Everyone
      io.emit("receive_message", data);

      console.log("Message Saved ✅");
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected ❌");
  });
});

// Test Route
app.get("/", (req, res) => {
  res.send("Server Running 🚀");
});

// Server Start
server.listen(5000, () => {
  console.log("Server Started On Port 5000");
});