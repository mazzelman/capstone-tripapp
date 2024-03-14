import mongoose from "mongoose";
import "./Place";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String },
  image: { type: String },
  email: { type: String },
  favoritePlaces: [{ type: Schema.Types.ObjectId, ref: "Place" }],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
