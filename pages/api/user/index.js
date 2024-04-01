import dbConnect from "@/db/connect";
import User from "@/db/models/User";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "PUT") {
    try {
      const { aboutmetext, id } = request.body;
      const newAboutMe = await User.findByIdAndUpdate(
        id,
        { aboutmetext },
        { new: true }
      );
      return response.status(200).json(newAboutMe);
    } catch (error) {
      return response.status(500).json({ error: "Server error" });
    }
  }

  if (request.method === "DELETE") {
    try {
      const user = await User.findById(id);
      if (!user) {
        return response.status(404).json({ error: "Comment not found" });
      }

      await User.updateOne(user.id, { $unset: { aboutmetext: aboutmetext } });

      return response.status(204).end();
    } catch (error) {
      return response.status(500).json({ error: "Server error" });
    }
  }
}
