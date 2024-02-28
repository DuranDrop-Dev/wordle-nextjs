import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: String,
    userUID: String,
    admin: Boolean
});

const UserDB = mongoose.models.users ?? mongoose.model("users", UserSchema);

export default UserDB;