import mongoose, { Schema, models } from "mongoose";

const watchListSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        movieId: {
            type: Number,
            required: true,
        },
        watchlist: {
            type: Object,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const WatchList =
    models.Watchlist || mongoose.model("Watchlist", watchListSchema);
export default WatchList;

