const express = require("express");
const cors = require("cors");  // ← UNCOMMENT - needed for Angular
const mongoose = require("mongoose");

const app = express();

// Fix Mongoose deprecation warning
mongoose.set("strictQuery", true);

// Middleware
app.use(cors());  // ← Enable CORS for frontend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection - Docker Compose hostname
const db = require("./app/models");
const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo:27017/meandb";

db.mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB!");
  })
  .catch((err) => {
    console.log("❌ Cannot connect to MongoDB:", err);
    process.exit(1);
  });

// Simple test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to MEAN Backend API!" });
});

// Tutorial CRUD routes
require("./app/routes/tutorial.routes")(app);

// PORT for Docker + Nginx proxy (3000)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 MongoDB: ${MONGO_URI}`);
});




// const express = require("express");
// //const cors = require("cors");

// const app = express();

// // parse requests of content-type - application/json
// app.use(express.json());

// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true }));

// const db = require("./app/models");
// db.mongoose
//   .connect(db.url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => {
//     console.log("Connected to the database!");
//   })
//   .catch(err => {
//     console.log("Cannot connect to the database!", err);
//     process.exit();
//   });

// // simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to Test application." });
// });

// require("./app/routes/tutorial.routes")(app);

// // set port, listen for requests
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });
