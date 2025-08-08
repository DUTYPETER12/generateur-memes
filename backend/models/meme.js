const mongoose = require("mongoose");

const MemeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    url: String,
    topText: String,
    bottomText: String,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Meme", MemeSchema);