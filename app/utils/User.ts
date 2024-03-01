import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userUID: String,
    email: String,
    dateCreated: Date,
    admin: Boolean,
    totalGames: Number,
    totalWins: Number,
    totalLosses: Number
});

const UserDB = mongoose.models.users ?? mongoose.model("users", UserSchema);

export default UserDB;