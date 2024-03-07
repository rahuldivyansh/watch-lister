import { MongoClient } from 'mongodb';

async function getMovieDetails() {
    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(uri);

    try {
        await client.connect();

        const database = client.db('test');
        const collection = database.collection('watchlist');

        const movieDetails = await collection.find().toArray();

        return movieDetails;
    } finally {
        await client.close();
    }
}

export default getMovieDetails;
