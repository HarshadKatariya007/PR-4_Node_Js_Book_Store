import mongoose from "mongoose";

export const Connect = async () =>
{
    await mongoose.connect("mongodb://localhost:27017");
    console.log("MongoDB Connected...");
}

