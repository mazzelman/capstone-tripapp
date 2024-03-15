import dbConnect from "@/db/connect";
import Comment from "@/db/models/Comment";

export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;

  //   const comment = await Comment.findById(id).populate({
  //     path: "comments",
  //     populate: { path: "comments" },
  //   });

  //   if (request.method === "POST") {
  //     comments.push(request.body.id);
  //     await user.save();
  //     return response.status(200).json({ message: "User updated " });
  //   }

  if (request.method === "POST") {
    try {
      const newComment = request.body;
      const comment = new Comment(newComment);
      await comment.save();
      return response.status(201).json({ status: "Comment created." });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
