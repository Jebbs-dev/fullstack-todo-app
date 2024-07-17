import mongoose, { Schema } from "mongoose";

const TaskSchema: Schema = new Schema({
  title: String,
  description: String,
  status: {
    type: "string",
    default: "pending",
    enum: ["pending", "in progress", "completed"],
  },
  userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Task = mongoose.model("Task", TaskSchema)
