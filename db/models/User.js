import mongoose from "mongoose";
import "./Place";
import "./Comment";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String },
  image: { type: String },
  email: { type: String },
  favoritePlaces: [{ type: Schema.Types.ObjectId, ref: "Place" }],
  userComments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  createdPlaces: [{ type: Schema.Types.ObjectId, ref: "Place" }],
  aboutmetext: { type: String },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
