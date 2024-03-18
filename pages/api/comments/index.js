import dbConnect from "../../../db/connect";
import Comment from "@/db/models/Comment";
import User from "@/db/models/User";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const { placeId } = request.query;
      const comments = await Comment.find({ placeId });
      return response.status(200).json(comments);
    } catch (error) {
      return response.status(500).json({ error: "Server error" });
    }
  }

  if (request.method === "POST") {
    try {
      const { username, commenttext, placeId } = request.body;

      // Find the user who wrote the comment
      const user = await User.findOne({ name: username });

      if (!user) {
        return response.status(404).json({ error: "User not found" });
      }

      const newComment = new Comment({
        username,
        commenttext,
        placeId,
        userImage: user.image,
      });

      const savedComment = await newComment.save();

      // Update the user's comments array with the new comment
      await User.findByIdAndUpdate(user._id, {
        $push: { userComments: savedComment._id },
      });

      return response.status(201).json(savedComment);
    } catch (error) {
      return response.status(500).json({ error: "Server error" });
    }
  }

  response.status(405).end(); // Method Not Allowed
}
