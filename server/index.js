require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connection = require("./db/db.js");
const userRoute = require("./routes/userRoute.js");
const avatarRoute = require("./routes/avatarRoute.js");
const cookieParser = require("cookie-parser");
const createWebSocketServer = require("./wsServer.js");
const path = require("path");

// Database connection
connection();

// Middlewares
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: function (origin, callback) {
    // For development, you might want to allow all origins
    const allowedOrigins = [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://127.0.0.1:5173",
    ];
    const isAllowed = !origin || allowedOrigins.includes(origin);

    callback(null, isAllowed);
  },
  credentials: true, // This is crucial
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Routes
app.use("/api/user", userRoute);
app.use("/api/avatar", avatarRoute);

// Start server
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Application Running on port ${port}`);
  createWebSocketServer(server);
});

// Serve static files in production
app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));

// Handle all other routes for SPA
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"), (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(500).send("Error loading app");
    }
  });
});
