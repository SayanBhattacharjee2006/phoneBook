import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
};

const generateToken = function (userId) {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
};

const registerUser = async function (req, res) {
    try {
        const { name, email, password } = req.body;

        if (!email || !password || !name) {
            return res
                .status(400)
                .json({ message: "All credentials required" });
        }

        const existedUser = await User.findOne({ email });

        if (existedUser) {
            return res
                .status(400)
                .json({ message: "User Already registered " });
        }

        const user = await User.create({
            email,
            name,
            password,
        });

        const token = generateToken(user._id);

        return res
            .status(201)
            .cookie("token", token, cookieOptions)
            .json({
                message: "User successfully registered",
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                },
            });
    } catch (error) {
        console.log("Registration Error: ", error?.message);
        return res
            .status(500)
            .json({ message: "Error occured during user registration" });
    }
};

const loginUser = async function (req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password required to login" });
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res
                .status(401)
                .json({ message: "Invalid email or password" });
        }

        const isPassCorrect = await user.comparePassword(password);

        if (!isPassCorrect) {
            return res
                .status(401)
                .json({ message: "Invalid email or password" });
        }

        const token = generateToken(user._id);

        return res
            .status(200)
            .cookie("token", token, cookieOptions)
            .json({
                message: "User successfully logged in",
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                },
            });
    } catch (error) {
        console.log("log in Error: ", error?.message);
        return res
            .status(500)
            .json({ message: "Error occured during user log in " });
    }
};

const logoutUser = async function (req, res) {
    try {
        return res
            .status(200)
            .clearCookie("token", cookieOptions)
            .json({ message: "User logged out successfully" });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Error occured at logging out user" });
    }
};

const getCurrentUser = async function (req, res) {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            message: "Current user retrieved successfully",
            data: {
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                },
            },
        });
    } catch (error) {
        console.log("Error retrieving current user:", error?.message);
        return res
            .status(500)
            .json({ message: "Error retrieving current user" });
    }
};

export { registerUser, loginUser, logoutUser, getCurrentUser };
