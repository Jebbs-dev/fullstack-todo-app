import mongoose, { Schema } from "mongoose";

const TaskSchema: Schema = new Schema({
  title: {type: String, required: true},
  status: {
    type: String,
    enum: ["Backlog", "Todo", "In Progress", "Done", "Cancelled"],
    required: true,
  },
  priority:{
    type: String,
    enum: ["Low", "Medium", "High"],
    required: true,
  },
  userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Task = mongoose.model("Task", TaskSchema)
