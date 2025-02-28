import jwt from "jsonwebtoken";
import express from "express";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import {
    registerUser,
    getUserByUsername,
    changeUsername,
    getUserByID,
    getUserDetails,
    changePassword,
    changeFullname
} from "../models/user.model.js";
import { generateToken, verifyToken, forgetPasswordSender, newHash, readHash, hashToken } from "../models/resetpassword.model.js";

dotenv.config();
const authRouter = express.Router();
authRouter.use(cookieParser());

authRouter.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ error: "Missing Credentials" });
        const hashedPassword = await bcrypt.hash(password, 12);
        const rows = await registerUser({ username, password: hashedPassword });
        res.json(rows[0]);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error registering user" });
    }
});

authRouter.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ error: "Missing Credentials" });
        const rows = await getUserByUsername(username);
        if (!rows || rows.length === 0) return res.status(400).json({ error: "Invalid credentials" });

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.cookie("token", token, { httpOnly: true, secure: process.env.SECURE, sameSite: "Strict" });
        res.status(200).json({ message: "Logged in successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error logging in" });
    }
});

authRouter.post("/logout", (req, res) => {
    res.clearCookie("token", { httpOnly: true, secure: process.env.SECURE, sameSite: "Strict" });
    res.json({ message: "Logged out successfully" });
});

authRouter.post("/changeUsername", async (req, res) => {
    try {
        const { oldUsername, username } = req.body;
        if (!username) return res.status(400).json({ error: "Missing Credentials" });
        const rows = await getUserByUsername(username);
        if (rows && rows.length > 0) return res.status(400).json({ error: "Username already taken" });

        // const result = await changeUsername(jwt.decode(req.cookies.token).id, username);
        const result = await changeUsername(oldUsername, username);
        res.status(200).json(result);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error changing username" });
    }
});

authRouter.post("/changePassword", async (req, res) => {
    try {
        const { oldpassword, newpassword } = req.body;
        if (!oldpassword || !newpassword) return res.status(400).json({ error: "Missing Credentials" });
        const user = await getUserByID(jwt.decode(req.cookies.token).id);
        // const { username } = req.body;
        // const row = await getUserByUsername(username);
        // const user = row[0];
        if (await bcrypt.compare(oldpassword, user.password)) {
            const hashedPassword = await bcrypt.hash(newpassword, 12);
            const result = await changePassword(jwt.decode(req.cookies.token).id, hashedPassword);
            // const result = await changePassword(user.id, hashedPassword);
            res.status(200).json(result);
        } else {
            res.status(400).json({ error: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error changing password" });
    };
});

authRouter.post("/changeFullname", async (req, res) => {
    try {
        const { fullname } = req.body;
        if (!fullname) return res.status(400).json({ error: "Missing Credentials" });
        const result = await changeFullname(jwt.decode(req.cookies.token).id, fullname);
        res.status(200).json(result);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error changing fullname" });
    };
});

authRouter.post("/changeEmail", async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ error: "Missing Credentials" });
        const result = await changeEmail(jwt.decode(req.cookies.token).id, email);
        res.status(200).json(result);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error changing email" });
    };
});

authRouter.get("/user", async (req, res) => {
    try {
        const decoded = jwt.decode(req.cookies.token);
        res.status(200).json(Object.assign(decoded, await getUserDetails(decoded.id)));
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error checking authorization" });
    }
});

authRouter.post("/reset", async (req, res) => {
    try {
        const username = req.body.username;
        if (!username) return res.status(400).json({ error: "Missing credentials" });

        const rows = await getUserByUsername(username);
        if (!rows || rows.length === 0) return res.status(400).json({ error: "Invalid credentials" });

        const user = rows[0];
        console.log(user);
        const { token, hash } = await generateToken();
        console.log(`token: ${token}, hash: ${hash}`);

        const result = await newHash({ user_id: user.id, hash });
        console.log(result);

        await forgetPasswordSender(user.email, token);
        res.status(200).json({ message: "Reset link sent" });
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error resetting password" });
    }
});

authRouter.get("/reset/:token", async (req, res) => {
    try {
        const token = req.params.token;
        const row = await readHash(hashToken(token));
        if (!row) {
            return res.status(400).json({ error: "Invalid token" });
        } else if (row.comsumed) {
            return res.status(400).json({ error: "Token already used" });
        } else if (row.token_expiry < new Date()) {
            return res.status(400).json({ error: "Token expired" });
        } else {
            res.status(200).json({ row });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error verifying token" });
    }
});

authRouter.put("/reset", async (req, res) => {
    try {
        const { token, password } = req.body;
        if (!token || !password) return res.status(400).json({ error: "Missing credentials" });

        const row = await readHash(hashToken(token));
        if (!row) {
            return res.status(400).json({ error: "Invalid token" });
        } else if (row.comsumed) {
            return res.status(400).json({ error: "Token already used" });
        } else if (row.token_expiry < new Date()) {
            return res.status(400).json({ error: "Token expired" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        await changePassword(row.user_id, hashedPassword);
        res.status(200).json({ message: "Password reset successfully" });

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Error resetting password" });
    }
});
//WILL DEAL WITH SECURITY ISSUE LATER

export default authRouter;
