import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
  },
  { timestamps: true, strict: true, strictQuery: true }
);

export default mongoose.model("Channel", schema, "channel");