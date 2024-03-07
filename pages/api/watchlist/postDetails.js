import { connectMongoDB } from "@/src/lib/mongodb";
import WatchList from "@/src/models/watchlist";
import withAuthApi from "@/src/middleware/withAuthApi";

async function handler(req, res) {
  try {
    const movieDetails = req.body;
    await connectMongoDB();

    const filter = { email: req.user, movieId: movieDetails.id };
    const update = { watchlist: movieDetails };

    const existingWatchList = await WatchList.findOneAndUpdate(filter, update, {
      upsert: true,
      new: true,
    });
    return res.status(200).json(existingWatchList);
  } catch (error) {
    return res.status(503).json({
      message: "Some error occured while adding to watchlist  ",
      error,
    });
  }
}

export default withAuthApi(handler);
