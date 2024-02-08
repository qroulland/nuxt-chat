import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    content: String,
    author_name: String,
    channel_id: String,
  },
  { timestamps: true, strict: true, strictQuery: true }
);

export default mongoose.model("Message", schema, "message");