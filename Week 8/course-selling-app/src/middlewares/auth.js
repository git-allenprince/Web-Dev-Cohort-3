const jwt = require("jsonwebtoken");
const { AdminModel } = require("../models/adminDB");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;
async function auth(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    try {
        const decodedInfo = jwt.verify(token, JWT_SECRET);
        const user = await AdminModel.findById(decodedInfo.id);

        if (!decodedInfo) return res.status(403).json({ error: "Login again." });
        else {
            req.user = user;
            next();
        }
    } catch (err) {
        console.log("Auth error");
        res.status(401).json({ error: err.message });
    }
}

module.exports = auth;