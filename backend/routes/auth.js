const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();

router.post("/register", async(req, res) => {
    const { username, nom, prenom, email, password, phone, birthdate } = req.body;
    try {
        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({ username, nom, prenom, email, password: hash, phone, birthdate });
        res.json({ success: true, user: { username, email } });
    } catch (e) {
        console.log(e); // Ajoute ceci pour voir l'erreur dans la console
        res.status(400).json({ error: "Utilisateur ou email déjà utilisé." });
    }
});

router.post("/login", async(req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "Utilisateur inconnu." });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: "Mot de passe incorrect." });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "2d" });
    res.json({ token, user: { username: user.username, email: user.email } });
});

module.exports = router;