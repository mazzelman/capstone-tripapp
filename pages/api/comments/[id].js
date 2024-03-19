import dbConnect from "../../../db/connect";
import Comment from "@/db/models/Comment";

export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;

  //----------------------------------------------------------------

  if (request.method === "GET") {
    try {
      const comment = await Comment.findById(id);
      if (!comment) {
        return response.status(404).json({ error: "Comment not found" });
      }
      return response.status(200).json(comment);
    } catch (error) {
      return response.status(500).json({ error: "Server error" });
    }
  }

  //----------------------------------------------------------------

  if (request.method === "PUT") {
    try {
      const { commenttext } = request.body;
      const updatedComment = await Comment.findByIdAndUpdate(
        id,
        { commenttext },
        { new: true }
      );
      return response.status(200).json(updatedComment);
    } catch (error) {
      return response.status(500).json({ error: "Server error" });
    }
  }

  //----------------------------------------------------------------

  if (request.method === "DELETE") {
    try {
      await Comment.findByIdAndDelete(id);
      return response.status(204).end();
    } catch (error) {
      return response.status(500).json({ error: "Server error" });
    }
  }

  //----------------------------------------------------------------

  response.status(405).end(); // Method Not Allowed
}
