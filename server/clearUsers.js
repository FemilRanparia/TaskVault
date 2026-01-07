const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 30000,
      retryWrites: true,
      w: "majority",
      maxPoolSize: 10,
      minPoolSize: 5
    });
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ Connection error:", error.message);
    process.exit(1);
  }
};

const clearUsers = async () => {
  try {
    const User = require("./src/models/User");
    
    const result = await User.deleteMany({});
    
    console.log(`✅ Deleted ${result.deletedCount} users from database`);
    console.log("🗑️  Database is now clean - ready for testing!");
    
    await mongoose.connection.close();
    console.log("✅ Database connection closed");
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

connectDB().then(clearUsers);
