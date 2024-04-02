import dbConnect from "@/db/connect";
import User from "@/db/models/User";

export default async function handler(request, response) {
  await dbConnect();

  //----------------------------------------------------------------

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

  //----------------------------------------------------------------

  if (request.method === "DELETE") {
    try {
      const { id } = request.body;
      const newAbout = await User.findByIdAndUpdate(
        id,
        { aboutmetext: "" },
        { new: true }
      );
      return response.status(200).json(newAbout);
    } catch (error) {
      return response.status(500).json({ error: "Server error" });
    }
  }

  //----------------------------------------------------------------

  return response.status(405).json({ error: "Method not allowed" });
}
