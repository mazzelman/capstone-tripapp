import mongoose from "mongoose";

const { Schema } = mongoose;

const reviewSchema = new Schema({
  review: { type: String, required: true },
  stars: { type: Number, required: true },
});

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

export default Review;
