const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true })
  } catch (error) {
    console.log("Database connection issue: ", error)
  }
}

module.exports = connectDB;