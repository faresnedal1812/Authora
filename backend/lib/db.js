import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("MONGO_DB connected successfully:", conn.connection.host);
  } catch (error) {
    console.log("Error connecting with MONGO_DB:", error.message);
  }
};
