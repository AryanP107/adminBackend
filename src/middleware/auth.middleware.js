import AdminUser from "../models/adminData.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
const jwtSecret = 'secret';

export const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization denied1' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = await AdminUser.findOne({ email: decoded.email });
        if (!req.user) return res.status(401).json({ message: 'Authorization denied' });
        next();
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
};