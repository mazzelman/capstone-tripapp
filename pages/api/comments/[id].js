import dbConnect from "../../../db/connect";
import Comment from "@/db/models/Comment";
import User from "@/db/models/User";

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
      // Find the comment to be deleted
      const comment = await Comment.findById(id);
      if (!comment) {
        return response.status(404).json({ error: "Comment not found" });
      }

      // Find the user who created the comment
      const user = await User.findById(comment.userId);
      if (!user) {
        return response.status(404).json({ error: "User not found" });
      }

      // Remove the comment ID from the user's userComments array
      await User.findByIdAndUpdate(user._id, { $pull: { userComments: id } });

      // Delete the comment
      await Comment.findByIdAndDelete(id);

      return response.status(204).end();
    } catch (error) {
      return response.status(500).json({ error: "Server error" });
    }
  }

  //----------------------------------------------------------------

  response.status(405).end(); // Method Not Allowed
}
