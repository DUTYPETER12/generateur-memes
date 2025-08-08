const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    nom: String,
    prenom: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: String,
    birthdate: String,
});

module.exports = mongoose.model("User", UserSchema);