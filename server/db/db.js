// server/db/db.js
const mongoose = require("mongoose");

module.exports = () => {
  try {
    mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database successfully");
  } catch (error) {
    console.log("COULD NOT CONNECT TO DB");
    console.error(error);
  }
};