import mongoose from "mongoose";
const { Schema } = mongoose;

const TodoSchema = new Schema(
  {
    title: String,
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const Todo = mongoose.model("Todo", TodoSchema);
export default Todo;
