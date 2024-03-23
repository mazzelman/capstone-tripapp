import mongoose from "mongoose";
import "./Place";
import "./User";

const { Schema } = mongoose;

const commentSchema = new Schema({
  commenttext: { type: String, required: true },
  username: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  userImage: { type: String, required: true },
  placeId: { type: Schema.Types.ObjectId, ref: "Place", required: true },
  createdAt: { type: Date, default: Date.now },
});

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;
