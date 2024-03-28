import mongoose from "mongoose";
import "./Review";
import "./Activity";
import "./User";
const { Schema } = mongoose;

const placeSchema = new Schema({
  name: { type: String, required: true },
  region: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: false },
  temperature: { type: Number, required: false },
  reviews: { type: [Schema.Types.ObjectId], ref: "Review" },
  activities: { type: [Schema.Types.ObjectId], ref: "Activity" },
  comments: { type: [Schema.Types.ObjectId], ref: "Comment" },
  initialReview: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  userName: { type: String, required: true },
  imageId: { type: String, required: false },
});

// Pre-save middleware to convert activities to strings
placeSchema.pre("save", async function (next) {
  try {
    if (this.activities && this.activities.length > 0) {
      // Convert each activity ObjectId to string
      this.activities = this.activities.map((activity) => activity.toString());
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Place = mongoose.models.Place || mongoose.model("Place", placeSchema);

export default Place;
