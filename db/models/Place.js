import mongoose from "mongoose";
import "./Review";
import "./Activity";
const { Schema } = mongoose;

const placeSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  temperature: { type: Number, required: false },
  isFavorite: { type: Boolean, required: false },
  reviews: { type: [Schema.Types.ObjectId], ref: "Review" },
  activities: { type: [Schema.Types.ObjectId], ref: "Activity" },
  comments: { type: [Schema.Types.ObjectId], ref: "Comment" },
});

const Place = mongoose.models.Place || mongoose.model("Place", placeSchema);

export default Place;
