import mongoose, { Schema } from "mongoose";

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true},
  password: { type: String, required: true },
  username: { type: String },
  createdAt: { type: Date, default: Date.now() },
});

export const User = mongoose.model("User", UserSchema);
