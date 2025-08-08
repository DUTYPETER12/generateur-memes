const express = require("express");
const Meme = require("../models/meme");
const jwt = require("jsonwebtoken");
const router = express.Router();

function auth(req, res, next) {
    const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;
    if (!token) return res.status(401).json({ error: "Non autorisé" });
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch {
        res.status(401).json({ error: "Token invalide" });
    }
}

router.get("/", auth, async(req, res) => {
    const memes = await Meme.find({ user: req.user.id });
    res.json(memes);
});

router.post("/", auth, async(req, res) => {
    const { url, topText, bottomText } = req.body;
    const meme = await Meme.create({ user: req.user.id, url, topText, bottomText });
    res.json(meme);
});

module.exports = router;