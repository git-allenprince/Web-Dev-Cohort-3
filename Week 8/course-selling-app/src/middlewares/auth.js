const jwt = require("jsonwebtoken");
const { AdminModel } = require("../models/adminDB");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI);

async function auth(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    try {
        const decodedInfo = jwt.verify(token, JWT_SECRET);
        const user = await AdminModel.findById(decodedInfo.id);

        if (!find) return res.status(403).json({ error: "Login again." });
        else {
            req.user = user;
            next();
        }
    } catch (err) {
        res.json({ error: err.message });
    }
}

module.exports = auth;