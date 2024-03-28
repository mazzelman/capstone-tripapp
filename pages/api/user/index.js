import dbConnect from "../../../db/connect";
import User from "@/db/models/User";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const users = await User.find().populate({
      path: "createdPlaces",
      populate: { path: "activities" },
    });

    return response.status(200).json(users);
  }
}
