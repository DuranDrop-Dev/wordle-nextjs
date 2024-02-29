import mongoose from "mongoose";

const StatsSchema = new mongoose.Schema({
    userID: String,
    email: String,
    totalGames: Number,
    totalWins: Number,
    totalLosses: Number
});

const StatsDB = mongoose.models.stats ?? mongoose.model("stats", StatsSchema);

export default StatsDB;