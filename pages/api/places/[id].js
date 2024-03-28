// import general things to run the app
import cloudinary from "cloudinary";
import dbConnect from "../../../db/connect";
// import models
import Place from "../../../db/models/Place";
import Comment from "@/db/models/Comment";
import User from "@/db/models/User";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const place = await Place.findById(id).populate(
      "activities reviews comments"
    );

    if (!place) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(place);
  }
  //----------------------------------------------------------------

  if (request.method === "PUT") {
    try {
      const updatedPlaceData = request.body;
      const updatedPlace = await Place.findByIdAndUpdate(
        id,
        updatedPlaceData,

        { new: true }
      );
      return response.status(200).json(updatedPlace);
    } catch (error) {
      return response.status(500).json({ error: "Server error" });
    }
  }

  //----------------------------------------------------------------

  if (request.method === "DELETE") {
    try {
      // Find the place
      const place = await Place.findById(id);

      if (!place) {
        return response.status(404).json({ status: "Not Found" });
      }

      // Delete the image from Cloudinary if exists
      if (place.imageId) {
        await cloudinary.uploader.destroy(place.imageId);
      }

      // Find and store the IDs of comments associated with this place
      const deletedCommentIds = await Comment.find({ placeId: id }).distinct(
        "_id"
      );

      // Delete comments associated with this place
      await Comment.deleteMany({ placeId: id });

      // Remove the deleted place from all users' createdPlaces and favoritePlaces arrays
      await User.updateMany(
        { $or: [{ createdPlaces: id }, { favoritePlaces: id }] },
        { $pull: { createdPlaces: id, favoritePlaces: id } }
      );

      // Remove references to comments related to the deleted place from all users' userComments array
      await User.updateMany(
        { userComments: { $in: deletedCommentIds } },
        { $pull: { userComments: { $in: deletedCommentIds } } }
      );

      // Delete the place
      await Place.findByIdAndDelete(id);

      return response.status(204).end();
    } catch (error) {
      return response.status(500).json({ error: "Server error" });
    }
  }

  //----------------------------------------------------------------

  response.status(405).end(); // Method Not Allowed
}
