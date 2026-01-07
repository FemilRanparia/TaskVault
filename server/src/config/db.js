const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
      socketTimeoutMS: 30000,
      retryWrites: true,
      w: "majority",
      maxPoolSize: 10,
      minPoolSize: 5
    });

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    console.error("Make sure your IP address is whitelisted in MongoDB Atlas");
    console.error("Visit: https://cloud.mongodb.com/v2/YOUR_PROJECT_ID#/security/network/access");
    process.exit(1);
  }
};

module.exports = connectDB;
