import mongoose, { Schema } from "mongoose";

const TaskSchema: Schema = new Schema({
  title: {type: String, required: true},
  status: {
    type: String,
    enum: ["backlog", "todo", "in progress", "done", "cancelled"],
    required: true,
  },
  priority:{
    type: String,
    enum: ["low", "medium", "high"],
    required: true,
  },
  userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Task = mongoose.model("Task", TaskSchema)
