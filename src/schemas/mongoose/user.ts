import mongoose, { Schema } from "mongoose";

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String },
  createdAt: { type: Date, default: Date.now() },
  // tasks: [{type: mongoose.Schema.Types.ObjectId, ref: "Task"}]
});

UserSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'userId'
})

export const User = mongoose.model("User", UserSchema);
