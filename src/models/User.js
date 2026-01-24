import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  username: { type: String, default: "Reader" }, 
  avatar: { type: String, default: "" },
  exp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  verified: { type: Boolean, default: false },
  otp: String,
  otpExpiry: Date,
});

export default mongoose.models.User || mongoose.model("User", UserSchema);