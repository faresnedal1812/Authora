import { generateVerificationEmailCode } from "../utils/generateVerificationEmailCode.js";
import User from "./../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateAccessTokenAndSetCookie } from "./../utils/generateAccessTokenAndSetCookie.js";
import validator from "validator";
import {
  sendResetPasswordEmail,
  sendResetPasswordSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../mailtrap/emails.js";
import crypto from "crypto";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }

    if (
      !validator.isStrongPassword(password, {
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 1,
      })
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Password is too weak. It must contain at least 6 characters, including uppercase, lowercase, number, and symbol.",
      });
    }

    const userAlreadyExist = await User.findOne({ email });
    if (userAlreadyExist) {
      return res
        .status(400)
        .json({ success: false, message: "User already exist" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = generateVerificationEmailCode();

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    await newUser.save();

    generateAccessTokenAndSetCookie(res, newUser._id);
    await sendVerificationEmail(newUser.email, verificationToken);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      newUser,
    });
  } catch (error) {
    console.log("Error in signup controller:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;

  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationExpiresAt: { $gt: Date.now() }, // token is valid
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationExpiresAt = undefined;

    await user.save();

    await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user,
    });
  } catch (error) {
    console.log("Error in verifyEmail controller:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExisting = await User.findOne({ email });
    if (!userExisting) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const validPassword = await bcryptjs.compare(
      password,
      userExisting.password,
    );

    if (!validPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    generateAccessTokenAndSetCookie(res, userExisting._id);

    userExisting.lastLogin = new Date();
    await userExisting.save();

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: userExisting,
    });
  } catch (error) {
    console.log("Error in login controller:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller:", error);
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const userExisting = await User.findOne({ email });
    if (!userExisting) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 60 * 60 * 1000; // 1 hour

    userExisting.resetPasswordToken = resetToken;
    userExisting.resetPasswordExpiresAt = resetTokenExpiresAt;

    await userExisting.save();

    await sendResetPasswordEmail(
      email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`,
    );
    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.log("Error in forgotPassword controller:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const userExisting = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() }, // token is valid
    });

    if (!userExisting) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    userExisting.password = hashedPassword;
    userExisting.resetPasswordToken = undefined;
    userExisting.resetPasswordExpiresAt = undefined;

    await userExisting.save();

    await sendResetPasswordSuccessEmail(userExisting.email);
    res
      .status(200)
      .json({ success: true, message: "Your password is changed successfuly" });
  } catch (error) {
    console.log("Error in resetPassword controller:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
