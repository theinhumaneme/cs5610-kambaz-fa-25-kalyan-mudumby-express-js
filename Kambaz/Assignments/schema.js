import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    course: String,
    availableFrom: String,
    availableUntil: String,
    dueDate: String,
    points: Number,
    description: String,
  },
  { collection: "assignments" },
);
export default schema;
