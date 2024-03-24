import dbConnect from "../../../db/connect";
import Place from "../../../db/models/Place";
import User from "@/db/models/User";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const places = await Place.find().populate("activities reviews");

    return response.status(200).json(places);
  }

  //----------------------------------------------------------------

  if (request.method === "POST") {
    try {
      const {
        name,
        region,
        description,
        initialReview,
        activities,
        image,
        userId,
        imageId,
      } = request.body;

      const newPlace = new Place({
        name,
        region,
        description,
        initialReview,
        activities,
        image,
        userId,
        imageId,
      });

      const savedPlace = await newPlace.save(); ///-----TURN ON AGAIN!!!

      // Update the user's createdPlaces array with the new place
      await User.findByIdAndUpdate(userId, {
        $push: { createdPlaces: savedPlace._id },
      });

      return response.status(201).json(savedPlace);
    } catch (error) {
      return response.status(500).json({ error: "Server error" });
    }
  }

  //----------------------------------------------------------------

  response.status(405).end(); // Method Not Allowed
}
