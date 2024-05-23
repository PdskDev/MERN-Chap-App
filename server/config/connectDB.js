const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Connected to DB");
    });
    connection.on("error", (error) => {
      console.log("Error to connect DB", error);
    });
  } catch (error) {
    console.log("Mongoose: some thing is wrong! ", error);
  }
}

module.exports = connectDB;
