import dbConnect from "@/db/connect";
import User from "@/db/models/User";

export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;

  const user = await User.findById(id).populate({
    path: "favoritePlaces",
    populate: { path: "activities reviews" },
  });

  if (request.method === "GET") {
    if (!user) {
      return response.status(404).json({ message: "User not found" });
    } else {
      return response.status(200).json(user);
    }
  }

  if (request.method === "POST") {
    user.favoritePlaces.push(request.body.id);
    await user.save();
    return response.status(200).json({ message: "User updated " });
  }

  if (request.method === "PATCH") {
    user.favoritePlaces.pull(request.body.id);
    await user.save();
    return response.status(200).json({ message: "User updated " });
  }
}
