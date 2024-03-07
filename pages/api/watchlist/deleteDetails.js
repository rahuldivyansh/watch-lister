import { connectMongoDB } from "@/src/lib/mongodb";
import withAuthApi from "@/src/middleware/withAuthApi";
import WatchList from "@/src/models/watchlist";

async function handler (req, res) {
    try {
        const movieId = req.body;
        
        await connectMongoDB();
        const filter = { email: req.user, movieId: movieId };
        
        const { result, error } = await WatchList.deleteOne(filter);
        if(error) throw new Error(error);
        return res.status(200).json(result);

    } catch (err) {
        return res.status(503).json({
            message: "Some error occured while deleting from watchlist  ",
        })
    }
}

export default withAuthApi(handler);