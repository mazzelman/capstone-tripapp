import dbConnect from "../../../db/connect";
import Comment from "@/db/models/Comment";

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

      const newComment = new Comment({
        username,
        commenttext,
        placeId, // Include the placeId when creating a new comment
      });

      const savedComment = await newComment.save();

      return response.status(201).json(savedComment);
    } catch (error) {
      return response.status(500).json({ error: "Server error" });
    }
  }

  response.status(405).end(); // Method Not Allowed
}
