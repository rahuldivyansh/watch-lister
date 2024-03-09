import WatchList from '@/src/models/watchlist';
import { connectMongoDB } from '@/src/lib/mongodb';
import withAuthApi from '@/src/middleware/withAuthApi';

async function handler(req, res) {
    try{
        await connectMongoDB();
        const watchlistData = await WatchList.find({ email: req.user });

        return res.status(200).json({message: "successfully fetching watchlist data from db",watchlistData});
    } catch (err){
        return res.status(503).json({ message: "Some error occured while fetching from database  ", error: err })
    }
}

export default withAuthApi(handler);
