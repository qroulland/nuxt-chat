import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: { type: String, unique: true },
    owner_id: String,
    users_connected: Array,
  },
  { timestamps: true, strict: true, strictQuery: true }
);

export default mongoose.model("Channel", schema, "channel");