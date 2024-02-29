import mongoose from "mongoose";

const GamesSchema = new mongoose.Schema({
    userUID: String,
    totalGames: Number,
    totalWins: Number,
    totalLosses: Number
});

const GamesDB = mongoose.models.games ?? mongoose.model("games", GamesSchema);

export default GamesDB;